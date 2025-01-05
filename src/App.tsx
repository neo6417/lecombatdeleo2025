import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute, AdminRoute } from './components/auth/ProtectedRoutes';
import { Layout } from './components/layout/Layout';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { SettingsPage } from './pages/SettingsPage';
import { ArticlePage } from './pages/ArticlePage';
import { ArticlesPage } from './pages/ArticlesPage';
import { EventsPage } from './pages/EventsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { DashboardPage } from './pages/admin/DashboardPage';
import { ArticleListPage } from './pages/admin/ArticleListPage';
import { ArticleEditorPage } from './pages/admin/ArticleEditorPage';
import { EventListPage } from './pages/admin/EventListPage';
import { EventEditorPage } from './pages/admin/EventEditorPage';
import { CategoriesPage } from './pages/admin/CategoriesPage';
import { CarouselImagesPage } from './pages/admin/CarouselImagesPage';
import { AdminSettingsPage } from './pages/admin/SettingsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { Hero } from './components/home/Hero';
import { FeaturedArticles } from './components/home/FeaturedArticles';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      <Route path="/about" element={
        <Layout>
          <AboutPage />
        </Layout>
      } />
      
      <Route path="/contact" element={
        <Layout>
          <ContactPage />
        </Layout>
      } />
      
      <Route path="/articles" element={
        <Layout>
          <ArticlesPage />
        </Layout>
      } />
      
      <Route path="/articles/:slug" element={
        <Layout>
          <ArticlePage />
        </Layout>
      } />

      <Route path="/projects" element={
        <Layout>
          <ProjectsPage />
        </Layout>
      } />

      <Route path="/events" element={
        <Layout>
          <EventsPage />
        </Layout>
      } />
      
      <Route path="/settings" element={
        <PrivateRoute>
          <Layout>
            <SettingsPage />
          </Layout>
        </PrivateRoute>
      } />
      
      <Route path="/admin/dashboard" element={
        <AdminRoute>
          <Layout>
            <DashboardPage />
          </Layout>
        </AdminRoute>
      } />
      
      <Route path="/admin/articles" element={
        <AdminRoute>
          <Layout>
            <ArticleListPage />
          </Layout>
        </AdminRoute>
      } />
      
      <Route path="/admin/articles/new" element={
        <AdminRoute>
          <Layout>
            <ArticleEditorPage />
          </Layout>
        </AdminRoute>
      } />
      
      <Route path="/admin/articles/:slug/edit" element={
        <AdminRoute>
          <Layout>
            <ArticleEditorPage />
          </Layout>
        </AdminRoute>
      } />

      <Route path="/admin/categories" element={
        <AdminRoute>
          <Layout>
            <CategoriesPage />
          </Layout>
        </AdminRoute>
      } />

      <Route path="/admin/events" element={
        <AdminRoute>
          <Layout>
            <EventListPage />
          </Layout>
        </AdminRoute>
      } />
      
      <Route path="/admin/events/new" element={
        <AdminRoute>
          <Layout>
            <EventEditorPage />
          </Layout>
        </AdminRoute>
      } />
      
      <Route path="/admin/events/:id/edit" element={
        <AdminRoute>
          <Layout>
            <EventEditorPage />
          </Layout>
        </AdminRoute>
      } />
      
      <Route path="/admin/carousel" element={
        <AdminRoute>
          <Layout>
            <CarouselImagesPage />
          </Layout>
        </AdminRoute>
      } />
      
      <Route path="/admin/settings" element={
        <AdminRoute>
          <Layout>
            <AdminSettingsPage />
          </Layout>
        </AdminRoute>
      } />
      
      <Route path="/" element={
        <Layout>
          <Hero />
          <FeaturedArticles />
        </Layout>
      } />
    </Routes>
  );
}