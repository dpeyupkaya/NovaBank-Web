import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation, animate } from 'framer-motion';
import { ArrowRight, Wallet, Send, FileText, BarChart2, MoreHorizontal, Download, Repeat, Shield, X, Check } from 'lucide-react';
import Navbar from './Navbar';

// --- Yardımcı Fonksiyonlar ve Simüle Veri ---

const formatCurrency = (amount, currency = 'TRY') => {
  return amount.toLocaleString('tr-TR', { style: 'currency', currency: currency });
};

const fetchHesapVerileri = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        kullaniciAdi: 'Ahmet_Yilmaz',
        kartNumarasiSonu: '9845',
        bakiye: 26842.55,
        harcamaAnalizi: [
          { day: 'Pzt', amount: 300 },
          { day: 'Sal', amount: 200 },
          { day: 'Çar', amount: 750 },
          { day: 'Per', amount: 400 },
          { day: 'Cum', amount: 1100 },
          { day: 'Cmt', amount: 600 },
          { day: 'Paz', amount: 150 },
        ],
        sonIslemler: [
          { id: 't1', icon: 'shopping', aciklama: 'Trendyol Siparişi', sirket: 'E-Ticaret', tutar: -450.99, tarih: 'Bugün' },
          { id: 't2', icon: 'food', aciklama: 'Restoran Yemeği', sirket: 'GetirYemek', tutar: -210.00, tarih: 'Bugün' },
          { id: 't3', icon: 'salary', aciklama: 'Maaş Ödemesi', sirket: 'Tech Inc.', tutar: 32500.00, tarih: 'Dün' },
        ],
      });
    }, 800);
  });
};

// --- Ana Bileşen: HesapIslemler ---

export const HesapIslemler = () => {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('anaSayfa');
  const [transferBilgileri, setTransferBilgileri] = useState({
    aliciHesap: '',
    miktar: '',
    aciklama: ''
  });
  const [islemDurumu, setIslemDurumu] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchHesapVerileri();
      setData(result);
    };
    getData();
  }, []);

  const handleTransfer = () => {
    if (!transferBilgileri.aliciHesap || !transferBilgileri.miktar) {
      alert('Lütfen tüm alanları doldurunuz');
      return;
    }

    const miktar = parseFloat(transferBilgileri.miktar);
    if (miktar <= 0) {
      alert('Geçersiz miktar');
      return;
    }

    if (miktar > data.bakiye) {
      alert('Yetersiz bakiye');
      return;
    }

    setIslemDurumu('processing');
    
    // Simüle edilmiş API çağrısı
    setTimeout(() => {
      setIslemDurumu('success');
      // Bakiyeyi güncelle
      setData({
        ...data,
        bakiye: data.bakiye - miktar,
        sonIslemler: [
          {
            id: `t${Date.now()}`,
            icon: 'transfer',
            aciklama: 'Para Transferi',
            sirket: transferBilgileri.aciklama || 'Havale',
            tutar: -miktar,
            tarih: 'Şimdi'
          },
          ...data.sonIslemler
        ]
      });
      
      // Formu temizle
      setTransferBilgileri({
        aliciHesap: '',
        miktar: '',
        aciklama: ''
      });
      
      // 3 saniye sonra durumu sıfırla
      setTimeout(() => {
        setIslemDurumu(null);
        setActiveTab('anaSayfa');
      }, 3000);
    }, 2000);
  };

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-gray-900 text-white font-sans min-h-screen p-4 md:p-8"
    >
      <Navbar />
          <main className="p-4 md:p-8 pt-6"></main>
      <div className="max-w-6xl mx-auto">
     
        <Header 
          kullaniciAdi={data.kullaniciAdi} 
          onBack={() => setActiveTab('anaSayfa')} 
          showBack={activeTab !== 'anaSayfa'}
        />
        
        <AnimatePresence mode="wait">
          {activeTab === 'anaSayfa' ? (
            <motion.div
              key="anaSayfa"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Sol Sütun: Bakiye ve İşlemler */}
              <div className="lg:col-span-2 space-y-8">
                <BalanceCard bakiye={data.bakiye} kartNumarasiSonu={data.kartNumarasiSonu} />
                <QuickActions onTransferClick={() => setActiveTab('transfer')} />
                <RecentTransactions islemler={data.sonIslemler} />
              </div>

              {/* Sağ Sütun: Harcama Analizi */}
              <div className="lg:col-span-1">
                <SpendingAnalysis harcamaAnalizi={data.harcamaAnalizi} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="transfer"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="max-w-md mx-auto"
            >
              <TransferForm 
                bilgiler={transferBilgileri}
                onChange={setTransferBilgileri}
                onSubmit={handleTransfer}
                islemDurumu={islemDurumu}
                bakiye={data.bakiye}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// --- Alt Bileşenler ---

const Header = ({ kullaniciAdi, onBack, showBack }) => (
  <motion.div
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
    className="flex justify-between items-center mb-8"
  >
    <div className="flex items-center gap-4">
      {showBack && (
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
        >
          <ArrowRight size={20} className="rotate-180" />
        </motion.button>
      )}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Merhaba, {kullaniciAdi}</h1>
        <p className="text-gray-400">{showBack ? 'Para Transferi' : 'Hesap hareketlerine hoş geldin.'}</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
        <Download size={20} />
      </button>
      <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
        <Shield size={20} />
      </button>
    </div>
  </motion.div>
);

const BalanceCard = ({ bakiye, kartNumarasiSonu }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        delay: 0.4,
        duration: 0.8,
      }
    });
  }, [controls]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className="relative p-6 md:p-8 rounded-2xl overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-gray-700/50"
    >
      <div className="relative z-10">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-400 text-sm">Toplam Bakiye</p>
            <AnimatedCounter finalValue={bakiye} />
          </div>
          <div className="flex items-center gap-2 bg-gray-900/50 px-3 py-1 rounded-full">
            <Wallet size={16} className="text-blue-400" />
            <span className="font-mono text-sm">**** {kartNumarasiSonu}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const AnimatedCounter = ({ finalValue }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(count, finalValue, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate(value) {
        setCount(value);
      }
    });
    return () => controls.stop();
  }, [finalValue]);

  return (
    <p className="text-4xl md:text-5xl font-bold tracking-tighter mt-1">
      {formatCurrency(count)}
    </p>
  );
};

const QuickActions = ({ onTransferClick }) => {
  const actions = [
    { label: 'Para Gönder', icon: Send, color: 'text-blue-400', action: onTransferClick },
    { label: 'Ödeme Yap', icon: FileText, color: 'text-green-400' },
    { label: 'Transferlerim', icon: Repeat, color: 'text-purple-400' },
    { label: 'Daha Fazla', icon: MoreHorizontal, color: 'text-gray-400' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      {actions.map((action, i) => (
        <motion.button 
          key={i}
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(31, 41, 55, 1)' }}
          whileTap={{ scale: 0.95 }}
          className="bg-gray-800 p-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-colors"
          onClick={action.action || (() => {})}
        >
          <div className={`p-3 rounded-full bg-gray-900/70`}>
            <action.icon size={22} className={action.color} />
          </div>
          <span className="text-sm font-medium text-gray-300">{action.label}</span>
        </motion.button>
      ))}
    </motion.div>
  );
};

const RecentTransactions = ({ islemler }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8, duration: 0.5 }}
    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6"
  >
    <h3 className="font-bold text-lg mb-4">Son İşlemler</h3>
    <div className="space-y-4">
      <AnimatePresence>
        {islemler.map((islem, i) => (
          <motion.div
            key={islem.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: i * 0.1 + 0.9 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-gray-700">
                <FileText size={18} className="text-gray-300"/>
              </div>
              <div>
                <p className="font-semibold">{islem.aciklama}</p>
                <p className="text-xs text-gray-400">{islem.sirket}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-mono font-semibold ${islem.tutar > 0 ? 'text-green-400' : 'text-gray-200'}`}>
                {formatCurrency(islem.tutar)}
              </p>
              <p className="text-xs text-gray-500">{islem.tarih}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  </motion.div>
);

const SpendingAnalysis = ({ harcamaAnalizi }) => {
  const maxAmount = Math.max(...harcamaAnalizi.map(h => h.amount));

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="bg-gradient-to-b from-[#1E293B] to-gray-800 p-6 rounded-2xl h-full"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg">Haftalık Analiz</h3>
        <BarChart2 size={20} className="text-gray-400" />
      </div>
      <div className="flex justify-between items-end h-64">
        {harcamaAnalizi.map((item, i) => (
          <div key={item.day} className="flex flex-col items-center gap-2 w-1/8">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(item.amount / maxAmount) * 100}%` }}
              transition={{ delay: i * 0.1 + 1, type: 'spring', stiffness: 200, damping: 20 }}
              className="w-6 bg-blue-500 rounded-t-full hover:bg-blue-400 transition-colors"
            ></motion.div>
            <span className="text-xs text-gray-400">{item.day}</span>
          </div>
        ))}
      </div>
      <button className="w-full mt-6 bg-blue-600 hover:bg-blue-500 transition-colors text-white font-semibold py-3 rounded-lg">
        Detaylı Rapor
      </button>
    </motion.div>
  );
};

const TransferForm = ({ bilgiler, onChange, onSubmit, islemDurumu, bakiye }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...bilgiler,
      [name]: value
    });
  };

  return (
     
    <motion.div
      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6"
    >
     
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Send className="text-blue-400" /> Para Transferi
      </h2>

      <AnimatePresence mode="wait">
        {islemDurumu === 'processing' ? (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-12"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mb-4"
            />
            <p className="text-lg">İşlem gerçekleştiriliyor...</p>
          </motion.div>
        ) : islemDurumu === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
              <Check className="text-green-400" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Transfer Başarılı!</h3>
            <p className="text-gray-400">
              {formatCurrency(parseFloat(bilgiler.miktar))} tutarındaki transfer işleminiz tamamlandı.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Alıcı IBAN/Telefon</label>
              <input
                type="text"
                name="aliciHesap"
                value={bilgiler.aliciHesap}
                onChange={handleChange}
                placeholder="TRXX XXXX XXXX XXXX XXXX XXXX XX"
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Miktar (₺)</label>
              <div className="relative">
                <input
                  type="number"
                  name="miktar"
                  value={bilgiler.miktar}
                  onChange={handleChange}
                  placeholder="0,00"
                  className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 pl-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300">₺</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Kullanılabilir bakiye: {formatCurrency(bakiye)}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Açıklama (Opsiyonel)</label>
              <input
                type="text"
                name="aciklama"
                value={bilgiler.aciklama}
                onChange={handleChange}
                placeholder="Ödeme açıklaması"
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={onSubmit}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all mt-4"
            >
              Transferi Onayla
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default HesapIslemler;