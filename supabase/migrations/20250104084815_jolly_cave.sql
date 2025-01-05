-- Création du bucket de stockage pour les médias
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Politique pour permettre l'accès public en lecture
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'media');

-- Politique pour permettre le téléchargement aux utilisateurs authentifiés
CREATE POLICY "Authenticated users can upload media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'media');

-- Politique pour permettre aux propriétaires de gérer leurs fichiers
CREATE POLICY "Users can update own media"
ON storage.objects FOR UPDATE
TO authenticated
USING (auth.uid() = owner);

-- Politique pour permettre aux propriétaires de supprimer leurs fichiers
CREATE POLICY "Users can delete own media"
ON storage.objects FOR DELETE
TO authenticated
USING (auth.uid() = owner);