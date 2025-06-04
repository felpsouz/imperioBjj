'use client'
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Menu, X, Phone, MapPin, Clock, Award, Users, Star } from 'lucide-react';

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
      <nav className="hidden md:flex space-x-8">
        <a href="#sobre" className="hover:text-blue-300 transition-colors">Sobre</a>
        <a href="#professor" className="hover:text-blue-300 transition-colors">Professor</a>
        <a href="#conquistas" className="hover:text-blue-300 transition-colors">Conquistas</a>
        <a href="#atletas" className="hover:text-blue-300 transition-colors">Atletas</a>
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
        <a href="#atletas" className="text-white text-xl hover:text-blue-300 transition-colors" onClick={toggleMenu}>Atletas</a>
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
      <h2 className="text-5xl font-bold mb-6 text-white">Bem-vindo ao Império Jiu-Jitsu</h2>
      <p className="text-xl max-w-3xl mb-10 text-gray-200">
        Formando campeões dentro e fora dos tatames desde 2010. 
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

// Athlete Carousel Component
const AthleteCarousel = ({ athletes }: { athletes: Athlete[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === athletes.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    
    return () => clearInterval(interval);
  }, [athletes.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === athletes.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? athletes.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="overflow-hidden rounded-lg shadow-2xl">
        <div className="relative h-96">
          {athletes.map((athlete, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-opacity duration-500 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="relative h-full bg-gradient-to-r from-red-600 to-blue-800 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users size={64} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{athlete.name}</h3>
                  <p className="text-lg">{athlete.achievements}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-3 rounded-full transition-all"
        aria-label="Anterior"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-3 rounded-full transition-all"
        aria-label="Próximo"
      >
        <ChevronRight size={24} />
      </button>
      <div className="flex justify-center mt-6">
        {athletes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 mx-1 rounded-full transition-all ${
              index === currentIndex ? "bg-blue-600 scale-125" : "bg-gray-400"
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Achievements Component
const Achievements = ({ achievements }: { achievements: Achievement[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {achievements.map((achievement, index) => (
        <div 
          key={index}
          className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
        >
          <div className="flex items-center mb-3">
            <Award className="text-yellow-600 mr-2" size={24} />
            <h3 className="text-xl font-bold text-blue-900">{achievement.title}</h3>
          </div>
          <p className="text-gray-600 mb-2 font-medium">{achievement.date}</p>
          <p className="text-gray-800">{achievement.description}</p>
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
              Fundado em 2010 pelo Mestre Iuri Marcos, o CT Império Jiu-Jitsu nasceu com a missão de transformar vidas através do Jiu-Jitsu brasileiro. O que começou como um pequeno espaço com apenas alguns alunos, hoje é um dos centros de treinamento mais respeitados do Brasil.
            </p>
            <p className="text-lg mb-4">
              Nossa filosofia se baseia não apenas na formação de lutadores, mas também de cidadãos. Acreditamos que o Jiu-Jitsu é muito mais que uma arte marcial - é um caminho para o desenvolvimento físico, mental e espiritual.
            </p>
            <p className="text-lg">
              Ao longo destes anos, formamos dezenas de campeões em competições nacionais e internacionais, mas nosso maior orgulho está nas histórias de superação e crescimento pessoal de cada aluno que passou pelos nossos tatames.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full h-96 rounded-lg overflow-hidden bg-gradient-to-br from-red-600 to-blue-800 flex items-center justify-center">
              <img src="/img/graduacao01.jpeg" alt="Graduação de 2024" />              
              <div className="text-center text-white">
              </div>
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
              <img src="/img/iuriMarcos.jpeg" alt="Mestre Iuri Marcos" />                       
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
              <Clock className="text-white mr-2" size={24} />
              <h3 className="text-2xl font-bold text-white">Horários</h3>
            </div>
            <ul className="text-left space-y-2 text-gray-200">
              <li><strong>Segunda a Sexta:</strong> 6h às 22h</li>
              <li><strong>Sábados:</strong> 9h às 13h</li>
              <li><strong>Kids (6-12 anos):</strong> 17h às 18h</li>
              <li><strong>Turma Feminina:</strong> 19h às 20h</li>
              <li><strong>Competição:</strong> 20h às 22h</li>
            </ul>
          </div>
          <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
            <div className="flex items-center justify-center mb-4">
              <MapPin className="text-white mr-2" size={24} />
              <h3 className="text-2xl font-bold text-white">Localização</h3>
            </div>
            <div className="text-left text-gray-200">
              <p className="mb-4">
                Av. Principal, 1000 - Centro<br />
                São Paulo - SP<br />
                CEP: 01000-000
              </p>
              <p>
                <strong>Telefone:</strong> (11) 99999-9999<br />
                <strong>Email:</strong> contato@imperiojiujitsu.com.br
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
          {/*
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
            </svg>
          </a>
          */}
          <a href="https://www.instagram.com/bjj_imperio/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          {/*
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
            </svg>
          </a>
          */}
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
      name: "Carlos Silva",
      image: "/atletas/carlos.jpg",
      achievements: "Campeão Mundial 2023, Medalha de Ouro IBJJF"
    },
    {
      name: "Ana Oliveira",
      image: "/atletas/ana.jpg",
      achievements: "Bicampeã Brasileira, Medalha de Prata Pan-Americano"
    },
    {
      name: "Pedro Santos",
      image: "/atletas/pedro.jpg",
      achievements: "Campeão Estadual, 3x Campeão Regional"
    },
    {
      name: "Mariana Costa",
      image: "/atletas/mariana.jpg",
      achievements: "Campeã Sul-Americana, Medalha de Ouro CBJJ"
    },
    {
      name: "Nikolas Ferreira",
      image: "/img/nikolasMedalhas.jpeg",
      achievements: "3x Medalha de Ouro Estadual, Campeão Nacional Novatos"
    }
  ];

  // Dados das conquistas
  const achievements: Achievement[] = [
    {
      title: "Campeonato Brasileiro 2023",
      date: "Dezembro 2023",
      description: "5 medalhas de ouro, 3 de prata e 7 de bronze, conquistando o 1º lugar geral por equipes."
    },
    {
      title: "IBJJF Open 2023",
      date: "Outubro 2023",
      description: "Participação de 12 atletas com 8 pódios, destacando a força da nossa equipe."
    },
    {
      title: "Campeonato Pan-Americano",
      date: "Julho 2023",
      description: "Representação internacional com 3 atletas medalhistas, elevando o nome do Brasil."
    },
    {
      title: "Campeonato Estadual 2023",
      date: "Maio 2023",
      description: "Domínio absoluto com 15 medalhas e título de melhor equipe do torneio."
    },
    {
      title: "Copa Kids 2023",
      date: "Abril 2023",
      description: "Formação de novos talentos com 10 crianças medalhistas na competição."
    },
    {
      title: "Torneio Masters",
      date: "Fevereiro 2023",
      description: "Nossos veteranos mostrando experiência com 7 medalhas conquistadas."
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
            <h2 className="text-4xl font-bold mb-8 text-center text-white">Conquistas</h2>
            <p className="text-lg text-center max-w-3xl mx-auto mb-10 text-gray-200">
              Ao longo dos anos, nossos atletas têm representado o CT Império Jiu-Jitsu nos maiores 
              campeonatos nacionais e internacionais, conquistando resultados expressivos que 
              consolidam nosso trabalho de excelência.
            </p>
            <Achievements achievements={achievements} />
          </div>
        </section>

        {/* Atletas Section */}
        <section id="atletas" className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center text-white">Nossos Atletas</h2>
            <p className="text-lg text-center max-w-3xl mx-auto mb-10 text-gray-200">
              Conheça alguns dos nossos atletas medalhistas que representam o 
              Império Jiu-Jitsu em competições pelo Brasil e pelo mundo.
            </p>
            <AthleteCarousel athletes={athletes} />
          </div>
        </section>

        {/* Contact Section */}
        <ContactSection />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}