"use client"
import Link from 'next/link';
import { projects } from '@/types/projects';
import { useState } from 'react';

const categories = Array.from(new Set(projects.map(project => project.category)));

export default function HomePage() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <div
      style={{
        padding: '2rem',
        fontFamily: 'Arial, sans-serif',
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <h1
        style={{
          fontSize: '2.5rem',
          marginBottom: '1rem',
          color: '#333',
        }}
      >
        Welcome to My Projects
      </h1>
      <p
        style={{
          fontSize: '1.2rem',
          marginBottom: '2rem',
          color: '#555',
        }}
      >
        Select a project below to explore:
      </p>
      {categories.map(category => (
        <div
          key={category}
          style={{
            marginBottom: '1.5rem',
            padding: '1rem',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
        >
          <h2
            onClick={() => toggleCategory(category)}
            style={{
              cursor: 'pointer',
              color: '#007bff',
              marginBottom: '0.5rem',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              textAlign: 'left',
              padding: '0.5rem',
              borderRadius: '4px',
              backgroundColor: expandedCategory === category ? '#e6f7ff' : 'transparent',
              transition: 'background-color 0.2s',
            }}
          >
            {category}
          </h2>
          {expandedCategory === category && (
            <ul
              style={{
                listStyle: 'none',
                padding: '0.5rem',
                marginBottom: '1rem',
                borderTop: '1px solid #ddd',
              }}
            >
              {projects
                .filter(project => project.category === category)
                .map(project => (
                  <li
                    key={project.id}
                    style={{
                      marginBottom: '1rem',
                      padding: '1rem',
                      borderRadius: '8px',
                      backgroundColor: '#ffffff',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      cursor: 'pointer',
                    }}
                  >
                    <Link
                      href={`/projects/${project.id}`}
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
                    >
                      <h3
                        style={{
                          margin: 0,
                          fontSize: '1.2rem',
                          color: '#007bff',
                        }}
                      >
                        {project.name}
                      </h3>
                      <p
                        style={{
                          margin: '0.5rem 0 0',
                          fontSize: '1rem',
                          color: '#555',
                        }}
                      >
                        {project.description}
                      </p>
                    </Link>
                  </li>
                ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}