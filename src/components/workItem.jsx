import React from 'react'
import GlitchImage from './glitchImage'
import { FaGithub } from 'react-icons/fa' // <-- import GitHub icon
import './workItem.css'

export default function WorkItem ({
  title,
  subtitle,
  description,
  image,
  techStack = [],
  githubLink // new prop
}) {
  return (
    <div className='work-item'>
      <div className='work-item-content'>
        <div className='work-item-left'>
          <h2 className='work-item-title'>{title}</h2>
          {subtitle && <h3 className='work-item-subtitle'>{subtitle}</h3>}
          <p className='work-item-description'>{description}</p>
          <div className='work-item-chips'>
            {techStack.map((tech, i) => (
              <div className='chip' key={i}>
                {tech}
              </div>
            ))}
          </div>
          {githubLink && (
            <a
              href={githubLink}
              className='github-button'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaGithub className='github-icon' />
              View on GitHub
            </a>
          )}
        </div>
        <div className='work-item-right'>
          <div className='work-item-image-wrapper'>
            <GlitchImage imageUrl={image} className='work-image' />
          </div>
        </div>
        <div className='divider'></div>
      </div>
    </div>
  )
}
