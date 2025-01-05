import React from 'react';
import { Heart, Users, Target } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <img
          src="https://lbeelrqqjthmwyxbdpej.supabase.co/storage/v1/object/public/media/leo-souriant.jpg?t=2025-01-04T15%3A19%3A04.930Z"
          alt="Léo souriant, tenant les mains de ses parents"
          className="w-64 h-64 object-cover rounded-lg mx-auto mb-8 shadow-lg"
        />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Voici Léo !</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
        <div className="prose prose-lg max-w-none">
          <p>
            Ce petit champion est né le 4 mars 2014. Sa date de naissance n'est pas forcément le plus beau souvenir qui soit car Léo a failli mourir ce jour-là suite à un problème de placenta. Mais il s'est battu comme un chef, contre les pronostics et le handicap.
          </p>
          
          <p>
            Aujourd'hui, ce petit bonhomme épate les gens par son sourire et ses prouesses. Il a appris à marcher après de nombreuses séances de rééducation, parle avec ses mains, tente même des cascades.
          </p>

          <p>
            Mais, il a aussi besoin de rééducations, 5 séances par semaine, d'un siège coque, de chaussures spéciales... Nous, ses parents, devons l'entourer d'énormément d'attention et de soutien.
          </p>

          <p>
            Le premier combat que nous avons mené, c'est celui de l'alimentation. Léo a dû être nourri par sonde, et nous avons tout tenté pour lui apprendre à manger. C'est la clinique Notube en Autriche qui nous a aidé à faire manger Léo, et surtout à devenir gourmand !
          </p>

          <p>
            La suite, c'est la marche autonome. Léo a encore besoin d'une poussette pour les longs trajets, et de coques et chaussures spécialisées pour la marche. Il va aussi avoir besoin d'un tricycle pour se muscler et améliorer son tonus.
          </p>

          <p>
            Enfin, notre dernier combat est le plus compliqué : apprendre à s'exprimer pour aller à l'école comme tout le monde. Pour cela, nous avons appris avec Léo le langage des signes, nous lui apprenons à communiquer par tablette, et nous faisons tous les jours une rééducation à la parole de la méthode Talk Tools.
          </p>

          <p>
            Tout cela, est financé par l'association, grâce à laquelle Léo avance chaque jour un peu plus !
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Notre Mission</h3>
          <p className="text-gray-600">
            Soutenir Léo dans son développement et son épanouissement quotidien.
          </p>
        </div>
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Notre Équipe</h3>
          <p className="text-gray-600">
            Une équipe dévouée de bénévoles et de professionnels engagés.
          </p>
        </div>
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Nos Objectifs</h3>
          <p className="text-gray-600">
            Permettre à Léo d'accéder à l'autonomie et à une vie épanouie.
          </p>
        </div>
      </div>
    </div>
  );
}