import React, { useState } from 'react';
import { FiSearch, FiMessageSquare, FiPhone, FiMail, FiChevronDown, FiExternalLink } from 'react-icons/fi';
import Navbar from './Navbar';

export const Yardim = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const helpCategories = [
    {
      id: 'hesap',
      title: 'Hesap İşlemleri',
      icon: '🏦',
      questions: [
        {
          id: 1,
          question: 'Hesap nasıl açabilirim?',
          answer: 'Mobil uygulamamız üzerinden veya şubelerimizden hesap açabilirsiniz. Gerekli belgeler: Kimlik kartı ve ikametgah belgesi.'
        },
        {
          id: 2,
          question: 'Hesap bakiyemi nasıl sorgularım?',
          answer: 'Ana sayfanızda hesap bakiyeniz görünmektedir. Ayrıntılı hesap hareketleri için "Hesap İşlemleri" sekmesini kullanabilirsiniz.'
        }
      ]
    },
    {
      id: 'transfer',
      title: 'Para Transferleri',
      icon: '💸',
      questions: [
        {
          id: 3,
          question: 'Havale işlemi ne kadar sürer?',
          answer: 'Aynı banka içi transferler anında, diğer bankalara EFT işlemleri en geç 1 iş günü içinde tamamlanır.'
        },
        {
          id: 4,
          question: 'Günlük transfer limiti nedir?',
          answer: "Standart limit 50.000 TL'dir. Limit artırımı için şubemize başvurabilirsiniz."
        }
      ]
    },
    {
      id: 'kart',
      title: 'Kart İşlemleri',
      icon: '💳',
      questions: [
        {
          id: 5,
          question: 'Kartım kayboldu/çalındı ne yapmalıyım?',
          answer: 'Hemen 0850 222 0 444 numaralı müşteri hizmetlerini arayarak kartınızı bloke ettirebilirsiniz.'
        }
      ]
    },
    {
      id: 'dijital',
      title: 'Dijital Bankacılık',
      icon: '📱',
      questions: [
        {
          id: 6,
          question: 'Şifremi unuttum nasıl sıfırlarım?',
          answer: 'Giriş ekranında "Şifremi Unuttum" butonuna tıklayarak SMS doğrulama ile şifrenizi sıfırlayabilirsiniz.'
        }
      ]
    }
  ];

  const popularQuestions = [
    { id: 7, question: 'Mobil uygulamaya nasıl giriş yapabilirim?', category: 'dijital' },
    { id: 8, question: 'Yurt dışında kartımı nasıl kullanabilirim?', category: 'kart' },
    { id: 9, question: 'Fatura ödeme işlemleri nasıl yapılır?', category: 'hesap' }
  ];

  const toggleCategory = (categoryId) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  const filteredCategories = helpCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <Navbar />
      <main className="p-4 md:p-8 pt-6"></main>
      <div className="max-w-6xl mx-auto">
        {/* Başlık ve Arama */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Yardım Merkezi</h1>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Sorularınızın cevaplarını bulamadınız mı? Bize ulaşın, size yardımcı olalım.
          </p>

          <div className="relative max-w-xl mx-auto mt-8">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-white" /> {/* Burada text-white sınıfını ekledik */}
            </div>
            <input
              type="text"
              placeholder="Yardım merkezinde ara..."
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/10 text-white placeholder-white/70"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Popüler Sorular */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Sık Sorulan Sorular</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {popularQuestions.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => {
                  setActiveCategory(item.category);
                  document.getElementById(item.category)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <p className="text-gray-800 font-medium">{item.question}</p>
                <p className="text-blue-600 text-sm mt-2 flex items-center">
                  Cevabı gör <FiExternalLink className="ml-1" />
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Yardım Kategorileri */}
        <div className="space-y-6">
          {filteredCategories.map((category) => (
            <div key={category.id} id={category.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-4">{category.icon}</span>
                  <h3 className="text-lg font-bold text-gray-800">{category.title}</h3>
                </div>
                <FiChevronDown className={`text-gray-500 transition-transform ${activeCategory === category.id ? 'transform rotate-180' : ''}`} />
              </button>

              {activeCategory === category.id && (
                <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                  <div className="space-y-4">
                    {category.questions.map((q) => (
                      <div key={q.id} className="pt-4">
                        <h4 className="font-medium text-gray-800">{q.question}</h4>
                        <p className="mt-2 text-gray-600">{q.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* İletişim Bölümü */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 md:p-12 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Hala yardıma ihtiyacınız var mı?</h2>
            <p className="text-blue-100 mb-6 max-w-2xl">
              Sorularınızı yanıtlamaktan mutluluk duyarız. Size ulaşabileceğimiz en kısa yolu seçin.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <div className="flex items-center mb-3">
                  <FiMessageSquare className="text-xl mr-3" />
                  <h3 className="font-bold">Canlı Destek</h3>
                </div>
                <p className="text-blue-100 text-sm mb-4">7/24 canlı destek hattımızla anında iletişim kurabilirsiniz.</p>
                <button className="text-white border border-white/50 hover:bg-white/10 px-4 py-2 rounded-lg text-sm transition-colors">
                  Sohbeti Başlat
                </button>
              </div>

              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <div className="flex items-center mb-3">
                  <FiPhone className="text-xl mr-3" />
                  <h3 className="font-bold">Telefon</h3>
                </div>
                <p className="text-blue-100 text-sm mb-4">0850 222 0 444 numaralı müşteri hizmetlerimizi arayın.</p>
                <a href="tel:08502220444" className="inline-block text-white border border-white/50 hover:bg-white/10 px-4 py-2 rounded-lg text-sm transition-colors">
                  Hemen Ara
                </a>
              </div>

              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <div className="flex items-center mb-3">
                  <FiMail className="text-xl mr-3" />
                  <h3 className="font-bold">E-posta</h3>
                </div>
                <p className="text-blue-100 text-sm mb-4">destek@bankadiniz.com adresine e-posta gönderebilirsiniz.</p>
                <a href="mailto:destek@bankadiniz.com" className="inline-block text-white border border-white/50 hover:bg-white/10 px-4 py-2 rounded-lg text-sm transition-colors">
                  E-posta Gönder
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Yardim;