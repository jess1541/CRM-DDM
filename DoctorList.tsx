import React, { useState } from 'react';
import { User } from '../types';
import Logo from './Logo';
import ParticleBackground from './ParticleBackground';

interface LoginProps {
  onLogin: (user: User) => void;
}

const USERS: User[] = [
  { name: 'ADMIN', role: 'admin', password: 'admin' },
  { name: 'ESPECIALISTA1', role: 'executive', password: '12345' },
  { name: 'ESPECIALISTA2', role: 'executive', password: '12345' },
  { name: 'ESPECIALISTA3', role: 'executive', password: '12345' },
  { name: 'ESPECIALISTA4', role: 'executive', password: '12345' }
];

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [selectedUser, setSelectedUser] = useState(USERS[0]);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === selectedUser.password) {
      onLogin({
        name: selectedUser.name,
        role: selectedUser.role
      });
    } else {
      setError('Contraseña incorrecta');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent p-4 relative z-10 w-full overflow-hidden">
      <ParticleBackground />
      <div className="max-w-md w-full bg-white/95 rounded-3xl shadow-2xl p-8 backdrop-blur-md border border-slate-200/50 relative overflow-hidden z-20">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500 rounded-full blur-3xl -z-10 opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-slate-400 rounded-full blur-3xl -z-10 opacity-10"></div>

        <div className="text-center mb-8">
          <Logo className="h-20 mx-auto mb-4" />
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Acceso al Sistema</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-black text-slate-700 mb-2 uppercase tracking-wide">Usuario</label>
            <select 
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm font-bold rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent block p-3 transition-all hover:bg-white"
              value={selectedUser.name}
              onChange={(e) => setSelectedUser(USERS.find(u => u.name === e.target.value) || USERS[0])}
            >
              {USERS.map(u => (
                <option key={u.name} value={u.name}>{u.name} ({u.role === 'admin' ? 'Administrador' : 'Especialista'})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-black text-slate-700 mb-2 uppercase tracking-wide">Contraseña</label>
            <input 
              type="password" 
              required 
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm font-bold rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent block p-3 transition-all hover:bg-white placeholder-slate-400"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
            />
          </div>

          {error && <p className="text-red-500 text-xs font-bold text-center bg-red-50 p-2 rounded-lg">{error}</p>}

          <button 
            type="submit" 
            className="w-full relative flex justify-center py-4 px-4 border border-transparent text-sm font-black uppercase tracking-widest rounded-xl text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-xl shadow-red-500/20 transition-all duration-300 transform hover:-translate-y-1"
          >
            Ingresar al Sistema
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
