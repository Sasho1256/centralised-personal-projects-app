import Link from 'next/link';
import { projects } from '@/types/projects';

export default function HomePage() {
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
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
        }}
      >
        {projects.map((project) => (
          <li
            key={project.id}
            style={{
              marginBottom: '1.5rem',
              padding: '1rem',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9',
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
              <h2
                style={{
                  margin: 0,
                  fontSize: '1.5rem',
                  color: '#007bff',
                }}
              >
                {project.name}
              </h2>
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
    </div>
  );
}
