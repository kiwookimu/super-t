import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, User, Camera, Save } from 'lucide-react';

interface EditProfilePageProps {
    onBack: () => void;
}

const EditProfilePage: React.FC<EditProfilePageProps> = ({ onBack }) => {
    const [form, setForm] = useState({
        name: '기우',
        phone: '010-1234-5678',
        email: 'kiwoo@example.com',
        birthDate: '1990-01-15',
        address: '서울특별시 강남구',
    });

    const handleChange = (field: keyof typeof form, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 flex items-center justify-between z-10">
                <div className="flex items-center">
                    <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg mr-2">
                        <ChevronLeft className="w-6 h-6 text-gray-900" />
                    </button>
                    <h1 className="text-lg font-bold text-gray-900">프로필 수정</h1>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium flex items-center gap-1">
                    <Save className="w-4 h-4" />
                    저장
                </button>
            </header>

            <main className="px-5 pt-6 space-y-6">
                {/* Avatar */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center"
                >
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                            <User className="w-12 h-12 text-white" />
                        </div>
                        <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-200">
                            <Camera className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">사진을 탭하여 변경</p>
                </motion.div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl p-5 shadow-sm space-y-5"
                >
                    <FormField
                        label="이름"
                        value={form.name}
                        onChange={(v) => handleChange('name', v)}
                    />
                    <FormField
                        label="휴대폰 번호"
                        value={form.phone}
                        onChange={(v) => handleChange('phone', v)}
                        type="tel"
                    />
                    <FormField
                        label="이메일"
                        value={form.email}
                        onChange={(v) => handleChange('email', v)}
                        type="email"
                    />
                    <FormField
                        label="생년월일"
                        value={form.birthDate}
                        onChange={(v) => handleChange('birthDate', v)}
                        type="date"
                    />
                    <FormField
                        label="주소"
                        value={form.address}
                        onChange={(v) => handleChange('address', v)}
                    />
                </motion.div>
            </main>
        </div>
    );
};

const FormField: React.FC<{
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
}> = ({ label, value, onChange, type = 'text' }) => (
    <div>
        <label className="text-sm text-gray-500 mb-2 block">{label}</label>
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>
);

export default EditProfilePage;
