'use client'
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Menu, X, Phone, MapPin, Clock, Award, Users, Star, Trophy, Medal } from 'lucide-react';

// Interfaces
interface Athlete {
  name: string;
  image: string;
  achievements: string;
}

interface Achievement {
  title: string;
  date: string;
  description: string;
}

// Header Component
const Header = ({ toggleMenu }: { toggleMenu: () => void }) => {
  return (
    <header className="pt-8 pb-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <div className="flex items-center">
        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mr-4">
          <span className="text-white font-bold text-xl">IJ</span>
        </div>
        <h1 className="text-3xl font-bold text-white">Império Jiu-Jitsu</h1>
      </div>
      <nav className="hidden md:flex space-x-8 text-white">
        <a href="#sobre" className="hover:text-blue-300 transition-colors">Sobre</a>
        <a href="#professor" className="hover:text-blue-300 transition-colors">Professor</a>
        <a href="#conquistas" className="hover:text-blue-300 transition-colors">Conquistas</a>
        <a href="#contato" className="hover:text-blue-300 transition-colors">Contato</a>
      </nav>
      <button 
        onClick={toggleMenu}
        className="md:hidden text-2xl text-white"
        aria-label="Menu"
      >
        <Menu size={28} />
      </button>
    </header>
  );
};

// Mobile Menu Component
const MobileMenu = ({ isOpen, toggleMenu }: { isOpen: boolean; toggleMenu: () => void }) => {
  return (
    <div className={`fixed inset-0 bg-black bg-opacity-95 z-50 transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 md:hidden`}>
      <div className="flex justify-end p-4">
        <button 
          onClick={toggleMenu}
          className="text-white text-3xl"
          aria-label="Fechar menu"
        >
          <X size={32} />
        </button>
      </div>
      <nav className="flex flex-col items-center space-y-8 pt-10">
        <a href="#sobre" className="text-white text-xl hover:text-blue-300 transition-colors" onClick={toggleMenu}>Sobre</a>
        <a href="#professor" className="text-white text-xl hover:text-blue-300 transition-colors" onClick={toggleMenu}>Professor</a>
        <a href="#conquistas" className="text-white text-xl hover:text-blue-300 transition-colors" onClick={toggleMenu}>Conquistas</a>
        <a href="#contato" className="text-white text-xl hover:text-blue-300 transition-colors" onClick={toggleMenu}>Contato</a>
      </nav>
    </div>
  );
};

// Hero Section Component
const HeroSection = () => {
  const openWhatsApp = () => {
    window.open("https://wa.me/5579988088866?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20aula%20experimental", "_blank");
  };

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
      <h2 className="text-5xl font-bold mb-6 text-white">Bem-vindo a Escola Império Jiu-Jitsu</h2>
      <p className="text-xl max-w-3xl mb-10 text-gray-200">
        Formando campeões dentro e fora dos tatames desde 2018. 
        Venha fazer parte da nossa família e transforme sua vida através do Jiu-Jitsu.
      </p>
      <button 
        onClick={openWhatsApp}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors flex items-center shadow-lg hover:shadow-xl"
      >
        <Phone className="w-6 h-6 mr-2" />
        Agende uma aula experimental
      </button>
    </section>
  );
};

// Enhanced Athlete Carousel Component (combinando ambos os estilos)
const AthleteCarousel = ({ athletes }: { athletes: Athlete[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % athletes.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [athletes.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % athletes.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + athletes.length) % athletes.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Carrossel principal */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {athletes.map((athlete, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <div className="flex flex-col md:flex-row items-center p-8 md:p-12">
                {/* Imagem do atleta */}
                <div className="w-48 h-48 md:w-56 md:h-56 mb-6 md:mb-0 md:mr-8 flex-shrink-0">
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-yellow-400 shadow-lg">
                    <img
                      src={athlete.image}
                      alt={athlete.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjNEI1NTYzIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNNTAgMTQwQzUwIDEyMCA3MCA5MCA5MCA5MEgxMTBDMTMwIDkwIDE1MCAxMjAgMTUwIDE0MFYxNjBINTBWMTQwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
                      }}
                    />
                    {/* Badge de campeão */}
                    <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2 shadow-lg">
                      <Trophy className="w-6 h-6 text-gray-900" />
                    </div>
                  </div>
                </div>

                {/* Informações do atleta */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {athlete.name}
                  </h3>
                  <div className="flex items-center justify-center md:justify-start mb-4">
                    <Medal className="w-6 h-6 text-yellow-400 mr-2" />
                    <span className="text-yellow-400 font-semibold text-lg">Atleta Destaque</span>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {athlete.achievements}
                  </p>
                  <div className="flex justify-center md:justify-start mt-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botões de navegação */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
          aria-label="Atleta anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
          aria-label="Próximo atleta"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Indicadores */}
      <div className="flex justify-center mt-6 space-x-2">
        {athletes.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-yellow-400 scale-125'
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
            aria-label={`Ver atleta ${index + 1}`}
          />
        ))}
      </div>

      {/* Navegação por thumbnails */}
      <div className="mt-8 flex justify-center space-x-4 overflow-x-auto pb-4">
        {athletes.map((athlete, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`flex-shrink-0 transition-all duration-300 ${
              index === currentIndex ? 'scale-110' : 'hover:scale-105'
            }`}
          >
            <div className={`w-16 h-16 rounded-full overflow-hidden border-2 ${
              index === currentIndex ? 'border-yellow-400' : 'border-gray-600'
            }`}>
              <img
                src={athlete.image}
                alt={athlete.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjNEI1NTYzIiByeD0iMzIiLz4KPGNpcmNsZSBjeD0iMzIiIGN5PSIyNCIgcj0iMTAiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTE2IDQ0QzE2IDM2IDI0IDMyIDMyIDMyUzQ4IDM2IDQ4IDQ0VjUyQzQ4IDU0IDQ2IDU2IDQ0IDU2SDIwQzE4IDU2IDE2IDU0IDE2IDUyVjQ0WiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
                }}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// Enhanced Achievements Component
const Achievements = ({ achievements }: { achievements: Achievement[] }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {achievements.map((achievement, index) => (
        <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center mb-4">
            <Trophy className="w-8 h-8 text-yellow-400 mr-3" />
            <div>
              <h3 className="text-xl font-bold text-white">{achievement.title}</h3>
              <p className="text-gray-400 text-sm">{achievement.date}</p>
            </div>
          </div>
          <p className="text-gray-300 leading-relaxed">{achievement.description}</p>
        </div>
      ))}
    </div>
  );
};

// About Section Component
const AboutSection = () => {
  return (
    <section id="sobre" className="px-4 py-16 sm:px-6 lg:px-8 bg-blue-900 bg-opacity-80">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center text-white">Nossa História</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 text-white">
            <p className="text-lg mb-4">
              Fundado em 2018 pelo Mestre Iuri Marcos, o CT Império Jiu-Jitsu nasceu com a missão de transformar vidas através do Jiu-Jitsu brasileiro. O que começou como um pequeno espaço com apenas alguns alunos, hoje é um dos centros de treinamento mais respeitados de Sergipe.
            </p>
            <p className="text-lg mb-4">
              Nossa filosofia se baseia não apenas na formação de lutadores, mas também de cidadãos. Acreditamos que o Jiu-Jitsu é muito mais que uma arte marcial, é um caminho para o desenvolvimento físico, mental e espiritual.
            </p>
            <p className="text-lg">
              Ao longo destes anos, formamos campeões em competições, mas nosso maior orgulho está nas histórias de superação e crescimento pessoal de cada aluno que passou pelos nossos tatames.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full h-96 rounded-lg overflow-hidden bg-gradient-to-br from-red-600 to-blue-800 flex items-center justify-center">
              <img src="/img/graduacao01.jpeg" alt="Graduação de 2024" className="w-full h-full object-cover" />              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Professor Section Component
const ProfessorSection = () => {
  return (
    <section id="professor" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center text-white">Professor Iuri Marcos</h2>
        <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
          <div className="md:w-1/2 text-white">
            <p className="text-lg mb-4">
              Com mais de 20 anos dedicados ao Jiu-Jitsu, o Professor Iuri Marcos é faixa preta 4º grau e possui um histórico impressionante de conquistas no esporte. Sua jornada começou aos 12 anos, quando descobriu no Jiu-Jitsu não apenas um esporte, mas um estilo de vida.
            </p>
            <p className="text-lg mb-4">
              Formado pelos grandes mestres da modalidade, Iuri desenvolveu uma metodologia própria de ensino que combina técnicas tradicionais com abordagens modernas, sempre priorizando a segurança e o desenvolvimento progressivo dos seus alunos.
            </p>
            <p className="text-lg">
              Além das conquistas como atleta, Iuri se destaca pela capacidade de formar campeões. Sua filosofia de ensino vai além das técnicas e envolve valores como disciplina, respeito e perseverança - princípios que guiam o CT Império Jiu-Jitsu.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="object-cover object-top w-full h-full">
              <img src="/img/iuriMarcos.jpeg" alt="Mestre Iuri Marcos" className="w-full h-full object-cover" />                       
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Section Component
const ContactSection = () => {
  const openWhatsApp = () => {
    window.open("https://wa.me/5579988088866?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20aula%20experimental", "_blank");
  };

  return (
    <section id="contato" className="px-4 py-16 sm:px-6 lg:px-8 bg-blue-900 bg-opacity-80">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8 text-white">Faça Parte do Império Jiu-Jitsu</h2>
        <p className="text-xl mb-8 text-gray-200">
          Transforme sua vida através do Jiu-Jitsu. Estamos com matrículas abertas para todas as idades e níveis, 
          desde iniciantes até competidores experientes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
  <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
    <div className="flex items-center justify-center mb-4">
      <Clock className="text-black mr-2" size={24} />
      <h3 className="text-2xl font-bold text-black">Horários</h3>
    </div>
    <ul className="text-left space-y-2 text-black">
      <li><strong>Jiu-Jitsu</strong> Segunda e Quarta: 10h, 14h, 20h</li>
      <li><strong>Jiu-Jitsu</strong> Sexta: 8h, 14h, 20h</li>
      <li><strong>Judô:</strong> Terça 20:30h</li>
      <li><strong>No Gi:</strong> Quinta: 20:30h</li>
      <li><strong>Kids:</strong> Terça e Quinta às 19h</li>     
    </ul>
  </div>
  <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
    <div className="flex items-center justify-center mb-4">
      <MapPin className="text-black mr-2" size={24} />
      <h3 className="text-2xl font-bold text-black">Localização</h3>
    </div>
    <div className="text-left text-black">
      <p className="mb-4">
        Av. José Carlos Magno França, 41 - Marcos Freire II<br />
        Nossa Senhora do Socorro - SE<br />
        CEP: 49160-000
      </p>
      <p>
        <strong>Telefone:</strong> (79) 98808-8866<br /> 
      </p>
    </div>
  </div>
</div>

        <button 
          onClick={openWhatsApp}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 rounded-full text-xl transition-all flex items-center mx-auto shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Phone className="w-6 h-6 mr-2" />
          Agende sua aula experimental grátis
        </button>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-black bg-opacity-90 py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-3">
            <span className="text-white font-bold">IJ</span>
          </div>
          <span className="text-xl font-bold text-white">Império Jiu-Jitsu</span>
        </div>
        <div className="flex space-x-6">
          <a href="https://www.instagram.com/bjj_imperio/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>
      </div>
      <div className="text-center mt-6 text-sm text-gray-400">
        © {new Date().getFullYear()} Império Jiu-Jitsu - Todos os direitos reservados
      </div>
    </footer>
  );
};


// Main App Component

export default function ImperioJiuJitsuApp() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Dados dos atletas
  const athletes: Athlete[] = [
    {
      name: "Gabriel Silva",
      image: "/img/gabrielMedalha.png",
      achievements: "Atleta destaque 2024 branca leve"
    },
    {
      name: "Robisson Filho",
      image: "/img/graduacao02.jpeg",
      achievements: "Campeão categia branca leve Sergipe"
    },
    {
      name: "Felipe Souza",
      image: "/img/graduacao01.jpeg",
      achievements: "Gué"
    },
    {
      name: "ketilly fontes",
      image: "/img/graduacao03.jpeg",
      achievements: "Atual campeã categoria branca leve"
    },
    {
      name: "Nikolas Ferreira",
      image: "/img/nikolasMedalhas.jpeg",
      achievements: "Atleta do Ano 2024 Juvenil categoria ate 74kg"
    }
  ];
  
  // Dados das conquistas
  const achievements: Achievement[] = [
    {
      title: "Liga Sergipana",
      date: "2024",
      description: "Foram 4 etapas, 9 atletas participando, 22 medalhas. 17 de ouro, 3 de prata e 2 de bronze"
    },
    {
      title: "Circuito Sergipano",
      date: "2024",
      description: "Participação de 12 atletas com 8 pódios, destacando a força da nossa equipe."
    },
    {
      title: "Copa Pódio",
      date: "2024",
      description: "Com 100% de aproveitamento, todos os atletas participantes garantiram o primeiro lugar no pódio."
    },
    {
      title: "Copa Tuchê",
      date: "2023",
      description: "Domínio absoluto com 15 medalhas e título de melhor equipe do torneio."
    },
    {
      title: "Circuito Alagoano",
      date: "2024",
      description: "Três atletas saíram para realizar o sonho de competir fora do estado e trouxeram medalhas de ouro em suas bagagens."
    },
    {
      title: "Norte Nordeste",
      date: "Fevereiro 2024",
      description: "5 medalhas de ouro, 3 de prata e 7 de bronze, conquistando o 1º lugar geral por equipes."
    }
  ];
  

  return (
    <div className="relative min-h-screen font-sans">
      {/* Menu Mobile */}
      <MobileMenu isOpen={menuOpen} toggleMenu={toggleMenu} />
      
      {/* Background */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-black via-gray-900 to-blue-900"></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <Header toggleMenu={toggleMenu} />

        {/* Hero Section */}
        <HeroSection />

        {/* About Section */}
        <AboutSection />

        {/* Professor Section */}
        <ProfessorSection />

        {/* Conquistas Section */}
        <section id="conquistas" className="px-4 py-16 sm:px-6 lg:px-8 bg-gray-900 bg-opacity-80">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center text-white flex items-center justify-center">
              <Award className="mr-4 text-yellow-400" size={40} />
              Nossas Conquistas
            </h2>
            <Achievements achievements={achievements} />
          </div>
        </section>

        {/* 
        Athletes Section 
        <section id="atletas" className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center text-white flex items-center justify-center">
              <Users className="mr-4 text-yellow-400" size={40} />
              Nossos Atletas
            </h2>
            <AthleteCarousel athletes={athletes} />
          </div>
        </section>
        */}

        {/* Contact Section */}
        <ContactSection />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
            