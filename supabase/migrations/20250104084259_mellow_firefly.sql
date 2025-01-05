/*
  # Attribution des droits administrateur

  1. Changements
    - Mise à jour du rôle de l'utilisateur spécifié en 'admin'
    - Vérification de l'existence de l'utilisateur
    - Attribution sécurisée des droits

  2. Sécurité
    - Utilisation de l'email pour identifier l'utilisateur
    - Vérification de l'existence avant modification
*/

DO $$ 
DECLARE
  user_id uuid;
BEGIN
  -- Récupère l'ID de l'utilisateur à partir de l'email
  SELECT id INTO user_id
  FROM auth.users
  WHERE email = 'neo6417@gmail.com';

  -- Vérifie si l'utilisateur existe
  IF user_id IS NOT NULL THEN
    -- Met à jour le rôle en admin
    UPDATE profiles
    SET role = 'admin'
    WHERE id = user_id;
    
    -- Crée le profil si n'existe pas encore
    INSERT INTO profiles (id, username, role, created_at)
    VALUES (
      user_id,
      'admin_' || substr(md5(random()::text), 1, 6),
      'admin',
      now()
    )
    ON CONFLICT (id) DO NOTHING;
  END IF;
END $$;