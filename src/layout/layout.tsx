import React from 'react';
import { Book } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  spellsCount?: number;
  favoritesCount?: number;
}

const Layout: React.FC<LayoutProps> = ({ children, spellsCount, favoritesCount }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Book className="w-8 h-8 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-900">Spell Grimoire</h1>
            </div>
            {(spellsCount !== undefined && favoritesCount !== undefined) && (
              <div className="flex items-center space-x-1">
                <span className="text-sm text-gray-500">
                  {spellsCount} spells • {favoritesCount} favorites
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Page Content */}
      {children}
    </div>
  );
};

export default Layout;