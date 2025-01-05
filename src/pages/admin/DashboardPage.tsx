import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Users, Settings } from 'lucide-react';
import { useArticles } from '../../hooks/useArticles';
import { useProfiles } from '../../hooks/useProfiles';

export function DashboardPage() {
  const { articles } = useArticles();
  const { profiles } = useProfiles();

  const stats = [
    {
      name: 'Articles',
      value: articles.length,
      icon: FileText,
      link: '/admin/articles'
    },
    {
      name: 'Utilisateurs',
      value: profiles.length,
      icon: Users,
      link: '/admin/users'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gérez votre contenu et vos utilisateurs
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link
            to="/admin/settings"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Settings className="h-4 w-4 mr-2" />
            Paramètres
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.name}
              to={stat.link}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stat.value}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Derniers articles
          </h2>
          <div className="space-y-4">
            {articles.slice(0, 5).map((article) => (
              <Link
                key={article.id}
                to={`/admin/articles/${article.slug}/edit`}
                className="block hover:bg-gray-50 p-2 -mx-2 rounded"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {article.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(article.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    article.status === 'published'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {article.status === 'published' ? 'Publié' : 'Brouillon'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Derniers utilisateurs
          </h2>
          <div className="space-y-4">
            {profiles.slice(0, 5).map((profile) => (
              <div key={profile.id} className="flex items-center">
                <div className="flex-shrink-0">
                  {profile.avatar_url ? (
                    <img
                      className="h-8 w-8 rounded-full"
                      src={profile.avatar_url}
                      alt={profile.username}
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <Users className="h-4 w-4 text-gray-500" />
                    </div>
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {profile.username}
                  </p>
                  <p className="text-sm text-gray-500">
                    {profile.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}