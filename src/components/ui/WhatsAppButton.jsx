export default function WhatsAppButton() {
  const phone = '237620107489'
  const message = encodeURIComponent(
    'Bonjour Reisetür 237 👋 Je souhaite avoir des informations sur vos services de mobilité internationale et vos cours d\'allemand.'
  )
  const url = `https://wa.me/${phone}?text=${message}`
  return (
    
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '28px',
        left: '24px',
        zIndex: 9999,
        backgroundColor: '#25D366',
        borderRadius: '50%',
        width: '56px',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(37,211,102,0.45)',
        transition: 'transform 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      aria-label="Nous contacter sur WhatsApp"
    >
      <svg width="30" height="30" viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.668 4.61 1.832 6.5L4 29l7.697-1.817A12.93 12.93 0 0016 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a10.93 10.93 0 01-5.276-1.352l-.37-.214-4.568 1.078 1.104-4.443-.232-.378A9.953 9.953 0 016 15c0-5.523 4.477-10 10-10zm-3.5 5c-.278 0-.584.077-.844.344-.26.267-1.156 1.13-1.156 2.75 0 1.622 1.185 3.19 1.344 3.406.158.216 2.29 3.658 5.656 4.969 2.8 1.09 3.367.873 3.969.818.601-.055 1.938-.793 2.219-1.562.28-.77.28-1.43.195-1.563-.084-.132-.306-.21-.64-.367-.334-.158-1.974-.974-2.28-1.086-.308-.11-.532-.165-.756.165-.224.33-.866 1.086-1.062 1.308-.196.222-.391.25-.725.083-.334-.166-1.41-.52-2.688-1.66-1.003-.896-1.68-2.004-1.877-2.338-.196-.334-.021-.515.148-.681.151-.15.334-.39.502-.586.166-.196.222-.334.334-.557.11-.222.055-.418-.028-.585-.083-.166-.74-1.797-1.024-2.454-.271-.636-.549-.546-.756-.554L12.5 8z"/>
      </svg>
    </a>
  )
}
