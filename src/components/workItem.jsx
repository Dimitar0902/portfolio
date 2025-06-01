import React from 'react'
import GlitchImage from './glitchImage'
import './workItem.css'

export default function WorkItem ({
  title,
  subtitle,
  description,
  image,
  techStack = []
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
        </div>
        <div className='work-item-right'>
          <div className='work-item-image-wrapper'>
            <GlitchImage imageUrl={image} />
          </div>
        </div>
      </div>
    </div>
  )
}
