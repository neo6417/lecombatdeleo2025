/*
  # Correction de la création automatique des profils

  1. Changements
    - Ajout d'une nouvelle fonction handle_new_user
    - Création d'un nouveau trigger pour la création automatique des profils
    - Ajout d'une fonction de nettoyage pour éviter les doublons

  2. Sécurité
    - La fonction s'exécute avec les privilèges du propriétaire (SECURITY DEFINER)
    - Vérification de l'existence du profil avant création
*/

-- Fonction de nettoyage des profils dupliqués
CREATE OR REPLACE FUNCTION cleanup_duplicate_profiles()
RETURNS void AS $$
BEGIN
  -- Supprime les profils dupliqués en gardant l'entrée la plus récente
  DELETE FROM profiles a
  WHERE EXISTS (
    SELECT 1 FROM profiles b
    WHERE b.id = a.id
    AND b.created_at > a.created_at
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Nouvelle fonction de gestion des nouveaux utilisateurs
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
DECLARE
  profile_exists boolean;
BEGIN
  -- Vérifie si le profil existe déjà
  SELECT EXISTS (
    SELECT 1 FROM profiles WHERE id = new.id
  ) INTO profile_exists;

  -- Crée le profil uniquement s'il n'existe pas
  IF NOT profile_exists THEN
    INSERT INTO profiles (
      id,
      username,
      full_name,
      avatar_url,
      created_at
    ) VALUES (
      new.id,
      COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'avatar_url',
      now()
    );
  END IF;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Création du nouveau trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Nettoie les profils dupliqués existants
SELECT cleanup_duplicate_profiles();