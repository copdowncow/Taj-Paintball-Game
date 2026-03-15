'use client';
import Link from 'next/link';
import { useState } from 'react';

const REVIEWS = [
  { name: 'Алишер Р.', text: 'Отличное место! Отмечали день рождения — все в восторге. Персонал профессиональный.', stars: 5 },
  { name: 'Диана М.', text: 'Были с командой. Организовали корпоратив — незабываемо! Рекомендую всем.', stars: 5 },
  { name: 'Фарход Н.', text: 'Бронировали онлайн — очень удобно. Всё было готово. Обязательно вернёмся.', stars: 5 },
];
const ADVANTAGES = [
  { icon: '🎯', title: 'Проф. оборудование', desc: 'Маркеры и маски международного класса' },
  { icon: '🌿', title: 'Большая игровая зона', desc: 'Поля с природным ландшафтом' },
  { icon: '👨‍🏫', title: 'Опытные инструкторы', desc: 'Проведут инструктаж и организуют игру' },
  { icon: '🎉', title: 'Мероприятия под ключ', desc: 'Дни рождения, корпоративы, турниры' },
  { icon: '🛡️', title: 'Безопасность', desc: 'Строгие правила и качественная защита' },
  { icon: '💎', title: 'Честные цены', desc: '70 сомони за 100 шаров без скрытых платежей' },
];
const STEPS = [
  { n: '01', title: 'Бронируйте онлайн', desc: 'Выберите дату, время, игроков и шары на каждого.' },
  { n: '02', title: 'Внесите предоплату', desc: 'Всего 50 сомони — и бронь подтверждена.' },
  { n: '03', title: 'Получите снаряжение', desc: 'Маркер, маска, жилет — всё включено.' },
  { n: '04', title: 'В бой!', desc: 'Инструктаж, команды — и незабываемая битва!' },
];

const NAV = [['#prices','Цены'],['#how','Как это работает'],['#reviews','Отзывы'],['#contacts','Контакты']];

export default function HomePage() {
  const [menu, setMenu] = useState(false);
  return (
    <div className="min-h-screen text-white" style={{background:'#060a12'}}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{background:'rgba(6,10,18,0.85)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
        <div className="px-4 py-3 flex items-center justify-between max-w-6xl mx-auto">
          <Link href="/" className="flex items-center gap-2.5">
            <div style={{width:34,height:34,background:'linear-gradient(135deg,#1e40af,#6366f1)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>🎯</div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black tracking-tight">TAJ</span>
              <span className="text-lg font-black tracking-tight gradient-text">PAINTBALL</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-7">
            {NAV.map(([h,l])=><a key={h} href={h} className="text-sm font-medium transition-colors" style={{color:'#94a3b8'}} onMouseEnter={e=>(e.target as HTMLElement).style.color='#fff'} onMouseLeave={e=>(e.target as HTMLElement).style.color='#94a3b8'}>{l}</a>)}
            <Link href="/booking" className="btn-primary py-2.5 px-5 text-sm">Забронировать</Link>
          </div>
          <button className="md:hidden p-2" onClick={()=>setMenu(!menu)} style={{WebkitTapHighlightColor:'transparent'}}>
            <div style={{width:22,height:14,position:'relative',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
              {[0,1,2].map(i=><span key={i} style={{display:'block',height:2,background:'white',borderRadius:2,transition:'all 0.2s',opacity:menu&&i===1?0:1,transform:menu?(i===0?'rotate(45deg) translateY(6px)':i===2?'rotate(-45deg) translateY(-6px)':''):'none'}}/>)}
            </div>
          </button>
        </div>
        {menu&&(
          <div className="md:hidden px-4 pb-5 pt-2 flex flex-col gap-1" style={{borderTop:'1px solid rgba(255,255,255,0.06)'}}>
            {NAV.map(([h,l])=><a key={h} href={h} className="py-3 px-3 text-base font-medium rounded-xl transition-colors" style={{color:'#94a3b8'}} onClick={()=>setMenu(false)}>{l}</a>)}
            <Link href="/booking" className="btn-primary py-4 text-center mt-2" onClick={()=>setMenu(false)}>🎯 Забронировать игру</Link>
          </div>
        )}
      </nav>

      {/* HERO — с фоном пейнтбол */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Фон: unsplash paintball */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=1600&q=80)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.25) saturate(0.8)',
        }}/>
        {/* Градиент поверх */}
        <div className="absolute inset-0" style={{background:'linear-gradient(to bottom, rgba(6,10,18,0.3) 0%, rgba(6,10,18,0.1) 40%, rgba(6,10,18,0.85) 85%, #060a12 100%)'}}/>
        {/* Синее свечение */}
        <div className="absolute inset-0" style={{background:'radial-gradient(ellipse at 50% 40%, rgba(37,99,235,0.15) 0%, transparent 65%)'}}/>

        <div className="relative z-10 text-center px-4 w-full max-w-2xl mx-auto py-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8" style={{background:'rgba(59,130,246,0.12)',border:'1px solid rgba(59,130,246,0.3)',color:'#93c5fd'}}>
            <span style={{width:6,height:6,background:'#3b82f6',borderRadius:'50%',display:'inline-block'}}/>
            Лучший пейнтбол в Таджикистане
          </div>
          <h1 className="font-black mb-5 leading-none">
            <span className="block text-5xl sm:text-7xl lg:text-8xl text-white mb-1">TAJ</span>
            <span className="block text-4xl sm:text-6xl lg:text-7xl gradient-text">PAINTBALL</span>
          </h1>
          <p className="text-lg sm:text-xl mb-3 font-medium" style={{color:'#cbd5e1'}}>Адреналин, командный дух и незабываемые эмоции</p>
          <p className="text-sm mb-10" style={{color:'#64748b'}}>Душанбе · Чордомаи Аэропорт · Рядом с клиникой «Нигох»</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center px-2">
            <Link href="/booking" className="btn-primary py-5 px-10 text-lg w-full sm:w-auto">🎯 Забронировать игру</Link>
            <a href="#how" className="btn-secondary py-5 px-10 text-lg w-full sm:w-auto">Как это работает</a>
          </div>
          <div className="mt-14 grid grid-cols-3 gap-3">
            {[['500+','Игр проведено'],['98%','Довольных гостей'],['5★','Рейтинг']].map(([n,l])=>(
              <div key={l} className="py-4 px-2 rounded-2xl text-center" style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.07)'}}>
                <div className="text-2xl font-black gradient-text">{n}</div>
                <div className="text-xs mt-1" style={{color:'#64748b'}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title mb-3">Почему <span className="gradient-text">Taj Paintball</span></h2>
            <p className="text-sm" style={{color:'#64748b'}}>Всё что нужно для идеальной игры</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ADVANTAGES.map(a=>(
              <div key={a.title} className="card p-5 group hover:border-blue-500/30 transition-all">
                <div className="text-3xl mb-3">{a.icon}</div>
                <h3 className="text-base font-bold text-white mb-1">{a.title}</h3>
                <p className="text-sm leading-relaxed" style={{color:'#64748b'}}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICES */}
      <section id="prices" className="py-20 px-4" style={{background:'rgba(255,255,255,0.02)'}}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title mb-3">Цены и <span className="gradient-text">пакеты</span></h2>
            <p className="text-sm" style={{color:'#64748b'}}>Простой расчёт: 100 шаров = 70 сомони на человека</p>
          </div>
          {/* Калькулятор */}
          <PriceCalculator />
          <div className="card-blue p-4 text-center mt-6">
            <p className="text-sm" style={{color:'#93c5fd'}}>
              <span className="font-bold text-white">Предоплата 50 сомони</span> — возвращается после игры ·
              Минимальный заказ — 100 шаров на человека
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title mb-3">Как проходит <span className="gradient-text">игра</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {STEPS.map(s=>(
              <div key={s.n} className="card p-6 flex gap-4 items-start">
                <div className="text-4xl font-black leading-none flex-shrink-0" style={{color:'rgba(59,130,246,0.25)'}}>{s.n}</div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{color:'#64748b'}}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-20 px-4" style={{background:'rgba(255,255,255,0.02)'}}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title mb-3">Отзывы <span className="gradient-text">гостей</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {REVIEWS.map(r=>(
              <div key={r.name} className="card p-5">
                <div className="flex gap-0.5 mb-3">{[...Array(r.stars)].map((_,i)=><span key={i} style={{color:'#fbbf24',fontSize:14}}>★</span>)}</div>
                <p className="text-sm leading-relaxed mb-4" style={{color:'#94a3b8'}}>{r.text}</p>
                <div className="text-sm font-semibold" style={{color:'#60a5fa'}}>{r.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-xl mx-auto">
          <div className="rounded-3xl p-10 text-center" style={{background:'linear-gradient(135deg,rgba(30,64,175,0.3),rgba(99,102,241,0.2))',border:'1px solid rgba(59,130,246,0.25)'}}>
            <h2 className="section-title mb-3">Готов к <span className="gradient-text">битве?</span></h2>
            <p className="text-sm mb-8" style={{color:'#64748b'}}>Забронируй игру прямо сейчас — онлайн, быстро и удобно</p>
            <Link href="/booking" className="btn-primary py-5 px-12 text-lg w-full block text-center">🎯 Забронировать игру</Link>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-20 px-4" style={{background:'rgba(255,255,255,0.02)'}}>
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title mb-8 text-center">Контакты</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              {icon:'📍',title:'Адрес',val:'Чордомаи Аэропорт, рядом с клиникой «Нигох»'},
              {icon:'📞',title:'Телефон',val:'+992 50 213 14 15',href:'tel:+992502131415'},
              {icon:'🕐',title:'Режим работы',val:'Ежедневно 10:00 – 21:00'},
            ].map(c=>(
              <div key={c.title} className="card p-5 text-center">
                <div className="text-3xl mb-3">{c.icon}</div>
                <div className="text-white font-bold text-sm mb-1">{c.title}</div>
                {c.href?<a href={c.href} className="text-sm" style={{color:'#60a5fa'}}>{c.val}</a>:<p className="text-sm" style={{color:'#64748b'}}>{c.val}</p>}
              </div>
            ))}
          </div>
          <a href="tel:+992502131415" className="flex items-center justify-center gap-2 w-full text-white font-bold py-4 rounded-2xl text-base transition-colors" style={{background:'linear-gradient(135deg,#16a34a,#15803d)',WebkitTapHighlightColor:'transparent'}}>
            📞 Позвонить нам
          </a>
        </div>
      </section>

      <footer className="py-8 px-4" style={{borderTop:'1px solid rgba(255,255,255,0.05)'}}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-black">TAJ</span>
            <span className="text-lg font-black gradient-text">PAINTBALL</span>
          </div>
          <p className="text-xs" style={{color:'#374151'}}>© 2024 Taj Paintball. Все права защищены.</p>
          <Link href="/admin" className="text-xs transition-colors" style={{color:'#1f2937'}}>Панель управления</Link>
        </div>
      </footer>
    </div>
  );
}

// Встроенный калькулятор цен
function PriceCalculator() {
  const [players, setPlayers] = useState(4);
  const [perPlayer, setPerPlayer] = useState(200);
  const total = players * perPlayer;
  const price = (total / 100) * 70;
  const options = [100, 200, 300, 500];
  return (
    <div className="card p-6 space-y-6">
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="text-sm font-semibold text-white">👥 Количество игроков</label>
          <span className="text-2xl font-black gradient-text">{players}</span>
        </div>
        <input type="range" min={1} max={30} value={players} onChange={e=>setPlayers(+e.target.value)}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{background:`linear-gradient(to right, #3b82f6 ${((players-1)/29)*100}%, rgba(255,255,255,0.1) ${((players-1)/29)*100}%)`}}/>
        <div className="flex justify-between text-xs mt-1" style={{color:'#4b5563'}}>
          <span>1</span><span>10</span><span>20</span><span>30</span>
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-white mb-3">🎯 Шаров на каждого игрока</label>
        <div className="grid grid-cols-4 gap-2">
          {options.map(n=>(
            <button key={n} onClick={()=>setPerPlayer(n)} style={{WebkitTapHighlightColor:'transparent'}}
              className={`py-3 rounded-xl text-sm font-bold transition-all ${perPlayer===n?'text-white':'text-neutral-300'}`}
              style={perPlayer===n
                ? {background:'linear-gradient(135deg,#1e40af,#3b82f6)',boxShadow:'0 4px 16px rgba(59,130,246,0.35)'}
                : {background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)'}}>
              {n}
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-2xl p-5" style={{background:'linear-gradient(135deg,rgba(30,64,175,0.2),rgba(99,102,241,0.1))',border:'1px solid rgba(59,130,246,0.2)'}}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm" style={{color:'#94a3b8'}}>Всего шаров:</span>
          <span className="font-bold text-white">{total.toLocaleString()} шт.</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm" style={{color:'#94a3b8'}}>Игроков:</span>
          <span className="font-bold text-white">{players} × {perPlayer} шаров</span>
        </div>
        <div style={{height:1,background:'rgba(255,255,255,0.08)',margin:'12px 0'}}/>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-white">Итого:</span>
          <span className="text-3xl font-black gradient-text">{price} сом.</span>
        </div>
      </div>
      <Link href="/booking" className="btn-primary py-4 text-base w-full block text-center">Забронировать →</Link>
    </div>
  );
}
