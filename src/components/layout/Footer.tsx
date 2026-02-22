import React from 'react';
import { Facebook, Instagram, ShieldCheck, Award, MessageSquare, Shield } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-white border-t border-gray-200 py-12 px-5 text-gray-700">
            <div className="max-w-7xl mx-auto flex flex-col gap-8">

                {/* Top Links Section */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex flex-wrap items-center text-[13px] gap-x-4 gap-y-2 font-medium">
                        <a href="#" className="font-bold text-gray-900 hover:underline">이용약관</a>
                        <span className="hidden lg:inline text-gray-300">|</span>
                        <a href="#" className="font-bold text-gray-900 hover:underline">개인정보 처리방침</a>
                        <span className="hidden lg:inline text-gray-300">|</span>
                        <a href="#" className="hover:underline">개인정보 이용내역</a>
                        <span className="hidden lg:inline text-gray-300">|</span>
                        <a href="#" className="hover:underline">미환급금 조회</a>
                        <span className="hidden lg:inline text-gray-300">|</span>
                        <a href="#" className="hover:underline">인증 센터</a>
                        <span className="hidden lg:inline text-gray-300">|</span>
                        <a href="#" className="hover:underline">프라이버시 센터</a>
                        <span className="hidden lg:inline text-gray-300">|</span>
                        <a href="#" className="hover:underline">커버리지</a>
                        <span className="hidden lg:inline text-gray-300">|</span>
                        <a href="#" className="hover:underline">동의 정보 지킴이</a>
                        <span className="hidden lg:inline text-gray-300">|</span>
                        <a href="#" className="hover:underline">이용자 피해 예방 센터</a>
                        <span className="hidden lg:inline text-gray-300">|</span>
                        <a href="#" className="hover:underline">선택약정 할인</a>
                        <span className="hidden lg:inline text-gray-300">|</span>
                        <a href="#" className="hover:underline">책임의 한계와 법적고지</a>
                        <span className="hidden lg:inline text-gray-300">|</span>
                        <a href="#" className="hover:underline">개인정보보호 자율감시센터</a>
                    </div>
                </div>

                {/* Sub Buttons */}
                <div className="flex flex-wrap gap-2 text-[12px]">
                    <button className="border border-gray-300 text-gray-600 px-3 py-1 bg-white hover:bg-gray-50 flex items-center gap-1"><MessageSquare className="w-3 h-3" /> 이메일 문의</button>
                    <button className="border border-gray-300 text-gray-600 px-3 py-1 bg-white hover:bg-gray-50">통신이용자정보 제공 내역 열람</button>
                    <button className="border border-gray-300 text-gray-600 px-3 py-1 bg-white hover:bg-gray-50">위치정보 제공내역 열람</button>
                </div>

                {/* Divider */}
                <hr className="border-gray-200" />

                {/* Awards / Certifications Grid (Mockup) */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center flex-wrap">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-500 rounded text-white flex items-center justify-center font-bold text-xs shrink-0">NCSI</div>
                        <div className="text-[11px] font-medium leading-tight">
                            <p className="text-gray-900 font-bold">국가고객만족도</p>
                            <p className="text-orange-600">28년 연속 1위</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-800 rounded flex flex-col items-center justify-center text-white shrink-0">
                            <ShieldCheck className="w-5 h-5" />
                            <span className="text-[8px] font-bold">KS-SQI</span>
                        </div>
                        <div className="text-[11px] font-medium leading-tight">
                            <p className="text-gray-900 font-bold">한국서비스품질지수</p>
                            <p className="text-blue-800">26년 연속 1위</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded flex flex-col items-center justify-center text-white shrink-0">
                            <Award className="w-5 h-5" />
                            <span className="text-[8px] font-bold">KCSI</span>
                        </div>
                        <div className="text-[11px] font-medium leading-tight">
                            <p className="text-gray-900 font-bold">한국산업고객만족도</p>
                            <p className="text-blue-600">27년 연속 1위</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center text-blue-500 font-bold text-lg italic shrink-0">
                            Wise User
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500 rounded flex items-center justify-center text-white shrink-0">
                            <Shield className="w-6 h-6" />
                        </div>
                        <div className="text-[11px] font-medium leading-tight text-gray-600">
                            과학기술정보통신부<br />웹접근성 준수
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center text-white font-bold text-lg shrink-0">WA</div>
                        <div className="text-[11px] font-medium leading-tight">
                            <p className="text-gray-900">13th 웹어워드 코리아</p>
                            <p className="text-gray-600">UX/UI 이노베이션 대상</p>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <hr className="border-gray-200" />

                {/* Bottom Section */}
                <div className="flex flex-col lg:flex-row justify-between gap-8 text-[13px] leading-relaxed">

                    {/* Company Info */}
                    <div className="space-y-4">
                        <div>
                            <span className="font-bold text-gray-900 mr-2">고객센터</span>
                            <span className="text-gray-700">대표: 휴대폰 국번 없이 114(무료) 또는 080-011-6000(무료), 국번 없이 1599-0011(유료)</span>
                            <br className="hidden lg:block" />
                            <span className="text-gray-700 lg:ml-12 mt-1 lg:mt-0 block lg:inline">인터넷/집전화: 080-816-2000(무료) 또는 1600-2000(유료) <span className="text-gray-300 mx-2">|</span> T 멤버십 마켓: 1670-9830(유료)</span>
                        </div>

                        <div className="text-gray-500 text-[12px] space-y-1">
                            <p className="font-bold text-gray-600">SK텔레콤(주)</p>
                            <p>대표이사/사장: 유영상 <span className="text-gray-300 mx-1">|</span> 사업자등록번호: 104-81-37225 <span className="text-gray-300 mx-1">|</span> 통신판매번호: 2004-서울중구-2923 <a href="#" className="underline ml-2">사업자 정보 확인</a></p>
                            <p>서울특별시 중구 을지로 65(을지로2가)</p>
                            <p>전자우편주소 tworld.cs@sktelecom.com</p>
                            <p>호스팅 사업자 Amazon Web Service(AWS)</p>
                            <p className="mt-2 text-[11px]">COPYRIGHT © SK TELECOM CO., LTD. ALL RIGHTS RESERVED.</p>
                        </div>
                    </div>

                    {/* Right Selectors / Social */}
                    <div className="flex flex-col items-start lg:items-end gap-4 min-w-[200px]">
                        <div className="flex gap-2 w-full lg:w-auto">
                            <button className="flex-1 lg:flex-none border border-gray-600 bg-gray-600 text-white px-4 py-2 flex items-center justify-center gap-2 text-sm font-bold min-w-[100px] hover:bg-gray-700 transition-colors">
                                🌐 ENG
                            </button>
                            <select className="flex-1 lg:flex-none border border-gray-300 px-4 py-2 text-sm text-gray-700 bg-white outline-none min-w-[140px] cursor-pointer">
                                <option>Family Site</option>
                                <option>SK Broadband</option>
                                <option>SK Planet</option>
                                <option>SK Hynix</option>
                            </select>
                        </div>

                        <div className="flex gap-3 text-gray-400 mt-2">
                            <a href="#" className="hover:text-gray-600 transition-colors"><Instagram className="w-6 h-6" /></a>
                            <a href="#" className="hover:text-gray-600 transition-colors">
                                {/* Using Camera as a placeholder for YouTube since lucide doesn't have youtube directly sometimes */}
                                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                            </a>
                            <a href="#" className="hover:text-gray-600 transition-colors bg-gray-400 text-white rounded-full p-1 self-start leading-none text-[10px] font-bold">NEWS</a>
                            <a href="#" className="hover:text-gray-600 transition-colors"><Facebook className="w-6 h-6" /></a>
                            {/* X (Twitter) Logo placeholder since lucide has twitter but not X exclusively.  */}
                            <div className="w-6 h-6 bg-gray-400 text-white rounded flex items-center justify-center font-bold font-sans hover:bg-gray-600 transition-colors">𝕏</div>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
