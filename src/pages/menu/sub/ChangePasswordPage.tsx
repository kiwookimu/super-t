import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Lock, Eye, EyeOff, Check, AlertCircle } from 'lucide-react';

interface ChangePasswordPageProps {
    onBack: () => void;
}

const ChangePasswordPage: React.FC<ChangePasswordPageProps> = ({ onBack }) => {
    const [form, setForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const passwordStrength = (password: string) => {
        if (password.length < 8) return { level: 0, text: '8자 이상 입력', color: 'text-gray-400' };
        if (password.length < 12) return { level: 1, text: '약함', color: 'text-red-500' };
        if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) return { level: 2, text: '보통', color: 'text-amber-500' };
        return { level: 3, text: '강함', color: 'text-green-500' };
    };

    const strength = passwordStrength(form.newPassword);
    const passwordsMatch = form.newPassword && form.confirmPassword && form.newPassword === form.confirmPassword;

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 flex items-center z-10">
                <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg mr-2">
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                </button>
                <h1 className="text-lg font-bold text-gray-900">비밀번호 변경</h1>
            </header>

            <main className="px-5 pt-6 space-y-4">
                {/* Icon */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex justify-center py-4"
                >
                    <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                        <Lock className="w-10 h-10 text-white" />
                    </div>
                </motion.div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl p-5 shadow-sm space-y-5"
                >
                    {/* Current Password */}
                    <div>
                        <label className="text-sm text-gray-500 mb-2 block">현재 비밀번호</label>
                        <div className="relative">
                            <input
                                type={showPasswords.current ? 'text' : 'password'}
                                value={form.currentPassword}
                                onChange={(e) => setForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                                placeholder="현재 비밀번호 입력"
                                className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                            />
                            <button
                                onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                            >
                                {showPasswords.current ? (
                                    <EyeOff className="w-5 h-5 text-gray-400" />
                                ) : (
                                    <Eye className="w-5 h-5 text-gray-400" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="text-sm text-gray-500 mb-2 block">새 비밀번호</label>
                        <div className="relative">
                            <input
                                type={showPasswords.new ? 'text' : 'password'}
                                value={form.newPassword}
                                onChange={(e) => setForm(prev => ({ ...prev, newPassword: e.target.value }))}
                                placeholder="새 비밀번호 입력"
                                className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                            />
                            <button
                                onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                            >
                                {showPasswords.new ? (
                                    <EyeOff className="w-5 h-5 text-gray-400" />
                                ) : (
                                    <Eye className="w-5 h-5 text-gray-400" />
                                )}
                            </button>
                        </div>
                        {/* Strength indicator */}
                        <div className="flex items-center gap-2 mt-2">
                            <div className="flex gap-1 flex-1">
                                {[1, 2, 3].map((level) => (
                                    <div
                                        key={level}
                                        className={`h-1 flex-1 rounded-full ${strength.level >= level
                                                ? level === 1 ? 'bg-red-400' : level === 2 ? 'bg-amber-400' : 'bg-green-400'
                                                : 'bg-gray-200'
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className={`text-xs font-medium ${strength.color}`}>{strength.text}</span>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="text-sm text-gray-500 mb-2 block">새 비밀번호 확인</label>
                        <div className="relative">
                            <input
                                type={showPasswords.confirm ? 'text' : 'password'}
                                value={form.confirmPassword}
                                onChange={(e) => setForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                placeholder="새 비밀번호 다시 입력"
                                className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                            />
                            <button
                                onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                            >
                                {showPasswords.confirm ? (
                                    <EyeOff className="w-5 h-5 text-gray-400" />
                                ) : (
                                    <Eye className="w-5 h-5 text-gray-400" />
                                )}
                            </button>
                        </div>
                        {form.confirmPassword && (
                            <div className={`flex items-center gap-1 mt-2 text-xs ${passwordsMatch ? 'text-green-500' : 'text-red-500'}`}>
                                {passwordsMatch ? (
                                    <><Check className="w-3 h-3" /> 비밀번호가 일치합니다</>
                                ) : (
                                    <><AlertCircle className="w-3 h-3" /> 비밀번호가 일치하지 않습니다</>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold disabled:bg-gray-300"
                    disabled={!form.currentPassword || !passwordsMatch || strength.level < 2}
                >
                    비밀번호 변경
                </motion.button>

                {/* Info */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xs text-gray-400 text-center"
                >
                    비밀번호는 8자 이상, 대문자와 숫자를 포함해야 합니다
                </motion.p>
            </main>
        </div>
    );
};

export default ChangePasswordPage;
