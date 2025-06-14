import React, { useState } from 'react';
import { FiUser, FiEdit, FiLock, FiMail, FiPhone, FiMapPin, FiCalendar, FiCreditCard, FiShield } from 'react-icons/fi';
import Navbar from './Navbar';

export const Profil = () => {
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Ahmet Yılmaz',
    email: 'ahmet.yilmaz@example.com',
    phone: '+90 555 123 45 67',
    address: 'İstanbul, Türkiye',
    birthDate: '15/05/1985',
    tcNo: '•••• •••• ••••',
    iban: 'TR12 3456 7890 1234 5678 9012 34'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setEditMode(false);
    // Burada API çağrısı yapılabilir
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
        <Navbar className="mb-8 " />
            <main className="p-4 md:p-8 pt-6"></main>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sol Sütun - Profil Bilgileri */}
          <div className="md:w-1/3">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 h-24"></div>
              <div className="px-6 pb-6 relative">
                <div className="flex justify-center -mt-12 mb-4">
                  <div className="h-24 w-24 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center overflow-hidden">
                    <FiUser className="text-gray-400 text-4xl" />
                  </div>
                </div>
                
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">{userData.name}</h2>
                  <p className="text-gray-600">Premium Üye</p>
                </div>

                <div className="space-y-4">
                  <button 
                    onClick={() => setEditMode(!editMode)}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
                  >
                    <FiEdit /> {editMode ? 'İptal' : 'Profili Düzenle'}
                  </button>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                      <FiShield />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Hesap Güvenliği</p>
                      <p className="text-xs text-gray-500">Yüksek</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hızlı Erişim */}
            <div className="mt-6 bg-white rounded-2xl shadow-md p-6">
              <h3 className="font-bold text-lg mb-4">Hızlı Erişim</h3>
              <div className="space-y-3">
                {[
                  { icon: <FiCreditCard className="text-blue-600" />, label: 'Kartlarım', link: '/kartlar' },
                  { icon: <FiLock className="text-green-600" />, label: 'Şifre Değiştir', link: '#' },
                  { icon: <FiMail className="text-purple-600" />, label: 'E-Posta Ayarları', link: '#' }
                ].map((item, index) => (
                  <a 
                    key={index}
                    href={item.link}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="text-xl">{item.icon}</div>
                    <span className="text-gray-700">{item.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Sağ Sütun - Kişisel Bilgiler */}
          <div className="md:w-2/3">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Kişisel Bilgiler</h2>
                {editMode && (
                  <button 
                    onClick={handleSave}
                    className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Kaydet
                  </button>
                )}
              </div>

              <div className="space-y-5">
                {/* Ad Soyad */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
                    {editMode ? (
                      <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg">{userData.name}</p>
                    )}
                  </div>
                </div>

                {/* E-Posta ve Telefon */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <FiMail /> E-Posta
                    </label>
                    {editMode ? (
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg">{userData.email}</p>
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <FiPhone /> Telefon
                    </label>
                    {editMode ? (
                      <input
                        type="tel"
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg">{userData.phone}</p>
                    )}
                  </div>
                </div>

                {/* Adres ve Doğum Tarihi */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <FiMapPin /> Adres
                    </label>
                    {editMode ? (
                      <input
                        type="text"
                        name="address"
                        value={userData.address}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg">{userData.address}</p>
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <FiCalendar /> Doğum Tarihi
                    </label>
                    {editMode ? (
                      <input
                        type="text"
                        name="birthDate"
                        value={userData.birthDate}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg">{userData.birthDate}</p>
                    )}
                  </div>
                </div>

                {/* TCKN ve IBAN (Düzenlenemez) */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">TC Kimlik No</label>
                    <p className="p-3 bg-gray-50 rounded-lg">{userData.tcNo}</p>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">IBAN</label>
                    <p className="p-3 bg-gray-50 rounded-lg">{userData.iban}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Güvenlik Ayarları */}
            <div className="mt-6 bg-white rounded-2xl shadow-md p-6">
              <h3 className="font-bold text-lg mb-4">Güvenlik Ayarları</h3>
              <div className="space-y-4">
                {[
                  { 
                    title: "İki Adımlı Doğrulama", 
                    description: "Hesabınıza ek güvenlik katmanı ekleyin",
                    status: "Aktif",
                    action: "Yönet"
                  },
                  { 
                    title: "Son Etkinlik", 
                    description: "10 dakika önce - İstanbul, TR",
                    status: "",
                    action: "Detaylar"
                  },
                  { 
                    title: "Bağlı Cihazlar", 
                    description: "2 aktif cihaz",
                    status: "",
                    action: "Görüntüle"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <div>
                      <h4 className="font-medium text-gray-800">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {item.status && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">{item.status}</span>}
                      <button className="text-sm text-blue-600 hover:text-blue-800">{item.action}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;