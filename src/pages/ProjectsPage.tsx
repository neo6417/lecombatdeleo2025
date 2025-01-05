import React from 'react';
import { ProjectSection } from '../components/projects/ProjectSection';

export function ProjectsPage() {
  const projects = [
    {
      title: "La poussette et les chaussures",
      content: "Leo ne devait pas marcher, mais après beaucoup d'efforts, il a déjoué les pronostics. Actuellement, il marche mais des adaptations sont indispensables. Il a les pieds en valgus, les pieds plats, donc il a des coques de positionnement, et l'achat de chaussures est compliqué, car il faut composer avec ses coques. Elles sont donc bien plus chères que des chaussures classiques. Il ne peut pas marcher aussi longtemps et vite qu'un enfant de son âge. Après 3 ans de porte-bébé, nous nous sommes enfin décidés à acheter une poussette pour Léo.",
      image: "https://images.unsplash.com/photo-1556316384-12c35d30afa4?w=800&auto=format&fit=crop"
    },
    {
      title: "La rééducation TalkTools",
      content: "Un des aspects les plus visibles du handicap de Leo, ce sont ses troubles de l'oralite et du langage. Les repas ont été longtemps compliqués, heureusement Notube nous a beaucoup aidé à améliorer les choses. Leo ne parle pas, à part maman et non, et peut avoir des pertes de saliver quand il est trop concentré sur une tâche.\n\nNous avons choisi de nous lancer dans une rééducation intensive du langage par le biais de TalkTools, une méthode anglaise. L'association a payé l'évaluation par l'orthophoniste anglaise, le déplacement jusqu'à Paris et le matériel spécialisé.\n\nAprès une évaluation de 2 heures, la thérapeute nous a envoyé une liste d'exercices à faire quotidiennement.\n\nTous les jours, nous apprenons à mâcher, souffler, faire des sons, mordre... Leo est parfois fatigué des efforts demandés mais très fier de maîtriser de nouveaux sons ou d'apprendre à faire des bulles.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop"
    },
    {
      title: "La tablette de communication et le langage des signes",
      content: "Ce n'est pas parce qu'on ne sait pas parler, qu'on n'a pas des choses à dire. Nous avons donc tout mis en place pour que Léo puisse s'exprimer: langage des signes avec des cours de LSF en famille et des cours pour la présidente de l'association, et achat d'une tablette pour la communication avec l'application Avaz. Léo préfère la langue des signes, nous devons insister pour qu'il utilise la tablette. Mais, pour l'école, la tablette lui apportera une meilleure compréhension par tous.",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop"
    },
    {
      title: "Les lunettes",
      content: "Léo a une très mauvaise vue: hypermétrope et astigmate, les lunettes lui sont indispensables et à changer souvent. Les verres doivent être teintées et affinés plusieurs fois. L'association finance le reste à charge.",
      image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&auto=format&fit=crop"
    },
    {
      title: "Les cours de gym",
      content: "Léo, comme tout enfant, avait envie d'un loisirs, support à la socialisation et lui permettant de faire du sport malgré son handicap. Après de multiples recherches, il est inscrit chaque mercredi à un cours de gym chez Toupti Gym. Il est intégré dans un cours avec des enfants de son âge, ordinaire et extra-ordinaire. L'association nous permet de financer ce loisirs.",
      image: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=800&auto=format&fit=crop"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Projets financer</h1>
        <p className="text-xl text-gray-600">
          Découvrez les différents projets que nous menons pour améliorer le quotidien de Léo
        </p>
      </div>

      <div className="space-y-8">
        {projects.map((project, index) => (
          <ProjectSection
            key={index}
            title={project.title}
            content={project.content}
            image={project.image}
          />
        ))}
      </div>

      <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Soutenez nos projets</h2>
        <p className="text-gray-600 mb-6">
          Votre soutien est essentiel pour nous aider à financer ces projets et améliorer le quotidien de Léo.
        </p>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Faire un don
        </button>
      </div>
    </div>
  );
}