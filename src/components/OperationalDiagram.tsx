import { CircleDot } from "lucide-react";
import type { CSSProperties } from "react";

const routes = [
  "M265 157C355 157 336 274 414 289",
  "M225 300H410",
  "M275 456C367 456 351 336 414 317",
  "M486 289C559 272 548 157 605 157",
  "M490 300H730",
  "M486 317C561 343 529 449 605 449",
];

export default function OperationalDiagram() {
  return (
    <figure className="vc-operation-diagram" data-scroll-reveal="up">
      <svg viewBox="0 0 900 570" fill="none" role="img" aria-label="Sistemas internos, canais de venda e aplicativos conectados a processos, dados centralizados e equipes">
        <defs>
          <radialGradient id="operation-hub-light"><stop stopColor="#e8ba69" stopOpacity=".23" /><stop offset="1" stopColor="#e8ba69" stopOpacity="0" /></radialGradient>
          <linearGradient id="operation-panel" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#d7ba87" stopOpacity=".065" /><stop offset="1" stopColor="#090909" stopOpacity=".3" /></linearGradient>
          <filter id="operation-light" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="4" /></filter>
        </defs>
        <g className="vc-operation-grid">
          {Array.from({ length: 10 }, (_, i) => <path key={`v${i}`} d={`M${35 + i * 90} 0V570`} />)}
          {Array.from({ length: 7 }, (_, i) => <path key={`h${i}`} d={`M0 ${40 + i * 85}H900`} />)}
        </g>
        <text className="vc-operation-flow" x="870" y="53" textAnchor="end">DIAGNÓSTICO　 →　 FLUXO　 →　 IMPLEMENTAÇÃO</text>
        <g className="vc-operation-routes">
          {routes.map((d) => <path key={d} d={d} />)}
          <path className="vc-operation-gold-route" d="M225 300H410M490 300H730" />
          <path className="vc-operation-arrows" d="M304 296l5 4-5 4M576 296l5 4-5 4M330 218l5 3 1-6M547 223l5-3-1 6M351 384l3 5 6-2" />
        </g>
        <g className="vc-operation-travelers" aria-hidden="true">
          {routes.map((path, index) => (
            <g
              key={path}
              className="vc-operation-traveler"
              style={{
                offsetPath: `path("${path}")`,
                animationDuration: `${5.4 + (index % 3) * .6}s`,
                animationDelay: `${-index * 1.25}s`,
              } as CSSProperties}
            >
              <circle r="7" fill="#efbf70" opacity=".65" filter="url(#operation-light)" />
              <circle r="2.6" fill="#fff2cf" />
            </g>
          ))}
        </g>
        <g className="vc-operation-panels">
          <rect x="85" y="97" width="180" height="122" rx="10" />
          <path d="M85 123H265M107 155H140M107 168H130M166 146H218M166 160H202M166 176H209" />
          <rect x="104" y="139" width="46" height="44" rx="4" />
          <rect x="55" y="256" width="170" height="110" rx="10" />
          <rect x="73" y="278" width="51" height="38" rx="2" /><path d="M98 316V329M84 329H113M144 282H201M144 299H180M144 315H193" />
          <rect x="135" y="399" width="140" height="124" rx="9" />
          <rect x="153" y="423" width="39" height="64" rx="4" /><path d="M163 413H182M160 448H183M160 460H176M160 472H180" />
          <rect x="605" y="97" width="185" height="122" rx="10" />
          <path d="M605 123H790M629 146H696M629 165H761M629 181H710" /><circle cx="749" cy="149" r="10" /><path d="M744 149H754M749 144V154" />
          <rect x="605" y="391" width="185" height="125" rx="10" />
          <path d="M625 414H767M625 432H722M650 453H737M625 474H762" /><circle cx="637" cy="453" r="8" /><circle cx="750" cy="453" r="8" />
        </g>
        <g className="vc-operation-database">
          <ellipse cx="782" cy="260" rx="52" ry="13" />
          <path d="M730 260V326C730 343 834 343 834 326V260M730 283C730 300 834 300 834 283M730 305C730 322 834 322 834 305" />
        </g>
        <g className="vc-operation-window-dots"><circle cx="102" cy="112" r="2" /><circle cx="114" cy="112" r="2" /><circle cx="126" cy="112" r="2" /><circle cx="624" cy="112" r="2" /><circle cx="636" cy="112" r="2" /><circle cx="648" cy="112" r="2" /></g>
        <g className="vc-operation-labels"><text x="118" y="205">SISTEMAS INTERNOS</text><text x="88" y="353">CANAIS DE VENDA</text><text x="169" y="510">APLICATIVO</text><text x="641" y="205">PROCESSOS</text><text x="758" y="359">DADOS</text><text x="758" y="372">CENTRALIZADOS</text><text x="642" y="502">EQUIPES E USUÁRIOS</text></g>
        <g className="vc-operation-label-dots"><circle cx="102" cy="201" r="3" /><circle cx="72" cy="349" r="3" /><circle cx="153" cy="506" r="3" /><circle cx="624" cy="201" r="3" /><circle cx="744" cy="361" r="3" /><circle cx="625" cy="498" r="3" /></g>
        <circle cx="450" cy="300" r="78" fill="url(#operation-hub-light)" />
        <circle className="vc-operation-hub" cx="450" cy="300" r="40" />
        <path className="vc-operation-cube" d="m450 283 15 9v18l-15 9-15-9v-18l15-9Zm-15 9 15 9 15-9m-15 9v18" />
        <g className="vc-operation-ports">{[[265,157],[225,300],[275,456],[605,157],[730,300],[605,449]].map(([x,y])=><g key={`${x}-${y}`}><circle cx={x} cy={y} r="8" filter="url(#operation-light)" opacity=".6" /><circle cx={x} cy={y} r="4" /></g>)}</g>
      </svg>
      <figcaption><CircleDot aria-hidden="true" /><p>Encontre o cenário que mais parece com o seu.<br />A solução é definida com base no que precisa funcionar e em quem vai usar.</p></figcaption>
    </figure>
  );
}
