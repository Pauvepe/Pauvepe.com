"use client";

import { useState, useRef, useCallback } from "react";

const productImages = [
  "https://huellaurbanabcn.com/wp-content/uploads/2026/02/dibaq-sense-cochinillo-segovia-perro-lata-577989-c75uI8.jpg",
  "https://huellaurbanabcn.com/wp-content/uploads/2026/02/dibaq-sense-cochinillo-segovia-informacion-nutricional-878633-c75uI8.jpg",
];

const variants = [
  { id: "6x380", name: "6 x 380g", discount: "-10%", oldPrice: "21,00", newPrice: "18,90" },
  { id: "12x380", name: "12 x 380g", discount: "-15%", oldPrice: "42,00", newPrice: "35,70" },
  { id: "380", name: "380 g", discount: null, oldPrice: null, newPrice: "3,50" },
];

const qtyDiscounts = [
  { n: 1, pct: 1, save: null },
  { n: 2, pct: 0.98, save: "2%" },
  { n: 3, pct: 0.97, save: "3%" },
  { n: 5, pct: 0.95, save: "5%" },
];

function parsePrice(s: string) {
  return parseFloat(s.replace(",", "."));
}

function formatPrice(n: number) {
  return n.toFixed(2).replace(".", ",");
}

export default function HuellaProductScreen() {
  const [currentImg, setCurrentImg] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedQtyTier, setSelectedQtyTier] = useState(0);
  const [qty, setQty] = useState(1);
  const [fading, setFading] = useState(false);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isDragging = useRef(false);

  const changeImage = useCallback((next: number) => {
    setFading(true);
    setTimeout(() => {
      setCurrentImg(next);
      setFading(false);
    }, 150);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isDragging.current = false;
  }, []);

  const handleTouchMove = useCallback(() => {
    isDragging.current = true;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) {
        changeImage((currentImg + 1) % productImages.length);
      } else {
        changeImage((currentImg - 1 + productImages.length) % productImages.length);
      }
    }
  }, [currentImg, changeImage]);

  const v = variants[selectedVariant];
  const basePrice = parsePrice(v.newPrice);
  const tier = qtyDiscounts[selectedQtyTier];
  const unitPrice = basePrice * tier.pct;
  const totalPrice = unitPrice * qty;
  const savedAmount = qty > 1 ? (basePrice * qty) - totalPrice : 0;

  const discountBadge = variants.reduce((best, vr) =>
    vr.discount && (!best || parseInt(vr.discount) < parseInt(best)) ? vr.discount : best
  , variants[0].discount);

  // Sync qty with tier selection
  const handleSelectQtyTier = useCallback((tierIndex: number) => {
    setSelectedQtyTier(tierIndex);
    setQty(qtyDiscounts[tierIndex].n);
  }, []);

  const handleSelectVariant = useCallback((i: number) => {
    setSelectedVariant(i);
    setSelectedQtyTier(0);
    setQty(1);
  }, []);

  const handleQtyChange = useCallback((newQty: number) => {
    const q = Math.max(1, newQty);
    setQty(q);
    // Auto-match to nearest tier
    const matchTier = qtyDiscounts.reduce((best, t, i) =>
      t.n <= q ? i : best
    , 0);
    setSelectedQtyTier(matchTier);
  }, []);

  return (
    <div className="hu-product">
      {/* ===== HEADER ===== */}
      <div className="hu-header">
        <div className="hu-header-hamburger">
          <span /><span /><span />
        </div>
        <div className="hu-header-search">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <span>Buscar</span>
        </div>
        <div className="hu-header-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://huellaurbanabcn.com/wp-content/uploads/2025/05/Recurso-14.svg"
            alt="Huella Urbana"
            style={{ height: 28, width: "auto" }}
          />
        </div>
        <div className="hu-header-right">
          <span className="hu-header-price">{`€${formatPrice(totalPrice)}`}</span>
          <div className="hu-header-cart">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            <span className="hu-cart-badge">{qty}</span>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </div>
      </div>

      {/* ===== BREADCRUMBS ===== */}
      <div className="hu-breadcrumbs">
        <span>PERRO</span>
        <span className="hu-bc-sep">&rsaquo;</span>
        <span>ALIMENTACION</span>
        <span className="hu-bc-sep">&rsaquo;</span>
        <span>COMIDA HUMEDA</span>
      </div>

      {/* ===== PRODUCT IMAGE CAROUSEL ===== */}
      <div className="hu-product-gallery">
        {discountBadge && <div className="hu-discount-badge">{discountBadge} DTO</div>}
        <div
          className="hu-product-img-wrap"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={productImages[currentImg]}
            alt="Dibaq Sense Cochinillo"
            className={`hu-product-img ${fading ? "hu-img-fade-out" : "hu-img-fade-in"}`}
          />
          <div className="hu-grain-free-tag">GRAIN<br/>FREE</div>
        </div>
        <div className="hu-gallery-arrows">
          <button
            className="hu-arrow"
            onClick={(e) => { e.stopPropagation(); e.preventDefault(); changeImage((currentImg - 1 + productImages.length) % productImages.length); }}
            onPointerDown={(e) => { e.stopPropagation(); }}
            type="button"
            aria-label="Imagen anterior"
          >
            &#8249;
          </button>
          <button
            className="hu-arrow"
            onClick={(e) => { e.stopPropagation(); e.preventDefault(); changeImage((currentImg + 1) % productImages.length); }}
            onPointerDown={(e) => { e.stopPropagation(); }}
            type="button"
            aria-label="Imagen siguiente"
          >
            &#8250;
          </button>
        </div>
        <div className="hu-gallery-thumbs">
          {productImages.map((src, i) => (
            <div
              key={i}
              className={`hu-thumb ${currentImg === i ? "active" : ""}`}
              onClick={() => changeImage(i)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" />
            </div>
          ))}
        </div>
        <div className="hu-gallery-dots">
          {productImages.map((_, i) => (
            <span
              key={i}
              className={`hu-dot ${currentImg === i ? "active" : ""}`}
              onClick={() => changeImage(i)}
            />
          ))}
        </div>
      </div>

      {/* ===== PRODUCT INFO ===== */}
      <div className="hu-product-info">
        <h1 className="hu-product-title">
          Dibaq Sense Cochinillo de Segovia con Manzana y Zanahoria
        </h1>

        {/* WhatsApp CTA */}
        <button className="hu-whatsapp-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.625-1.474A11.932 11.932 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.16 0-4.16-.672-5.813-1.813l-.417-.27-2.742.875.87-2.695-.293-.438A9.716 9.716 0 0 1 2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12s-4.365 9.75-9.75 9.75z"/></svg>
          Pedir mas informacion
        </button>

        {/* Price */}
        <div className="hu-price">{`€${formatPrice(totalPrice)}`}</div>

        {/* Short description */}
        <div className="hu-short-desc">
          <p><strong>Tamanos:</strong> 6 x 380 g, 12 x 380 g, 380 g</p>
          <p>Deliciosa comida humeda hipoalergenica Dibaq Sense Cochinillo de Segovia para perros adultos. Una receta 100% natural, Grain Free y monoproteica, elaborada con carnes frescas de cochinillo segoviano, manzana y zanahoria.</p>
        </div>

        {/* Separator */}
        <hr className="hu-separator" />

        {/* Size variants - clickable */}
        <div className="hu-variants">
          {variants.map((vr, i) => (
            <div
              key={vr.id}
              className={`hu-variant ${!vr.discount ? "single" : ""} ${selectedVariant === i ? "selected" : ""}`}
              onClick={() => handleSelectVariant(i)}
            >
              {vr.discount && <div className="hu-variant-discount">{vr.discount}</div>}
              <div className="hu-variant-name">{vr.name}</div>
              {vr.oldPrice ? (
                <div className="hu-variant-prices">
                  <span className="hu-old-price">{`€${vr.oldPrice}`}</span>
                  <span className="hu-new-price">{`€${vr.newPrice}`}</span>
                </div>
              ) : (
                <div className="hu-new-price">{`€${vr.newPrice}`}</div>
              )}
            </div>
          ))}
        </div>
        <span className="hu-clear-link">Limpiar</span>

        {/* Price display */}
        <div className="hu-price-display">
          <span className="hu-price-main">{`€${formatPrice(unitPrice)}`}</span>
          {(v.oldPrice || selectedQtyTier > 0) && (
            <span className="hu-price-old">{`€${v.oldPrice || v.newPrice}`}</span>
          )}
          {selectedQtyTier > 0 && (
            <span className="hu-price-discount-tag">{tier.save} dto</span>
          )}
        </div>

        {/* Total line */}
        {qty > 1 && (
          <div className="hu-total-line">
            <span>{qty} ud. × €{formatPrice(unitPrice)} = </span>
            <strong>€{formatPrice(totalPrice)}</strong>
            {savedAmount > 0.01 && (
              <span className="hu-total-saved">Ahorras €{formatPrice(savedAmount)}</span>
            )}
          </div>
        )}

        {/* Quantity discounts */}
        <p className="hu-qty-title">Compra mas, ahorra mas</p>
        <div className="hu-qty-grid">
          {qtyDiscounts.map((opt, i) => (
            <button
              key={opt.n}
              type="button"
              className={`hu-qty-option ${selectedQtyTier === i ? "active" : ""}`}
              onClick={() => handleSelectQtyTier(i)}
            >
              <span className="hu-qty-label">
                x{opt.n}
                {opt.save && <span className="hu-qty-save">{opt.save}</span>}
              </span>
              <span className="hu-qty-unit">{formatPrice(basePrice * opt.pct)} € /ud.</span>
            </button>
          ))}
        </div>

        {/* Add to cart */}
        <div className="hu-add-to-cart">
          <div className="hu-qty-selector">
            <button onClick={() => handleQtyChange(qty - 1)}>−</button>
            <span>{qty}</span>
            <button onClick={() => handleQtyChange(qty + 1)}>+</button>
          </div>
          <button className="hu-cart-btn">Anadir al carrito</button>
        </div>

        <hr className="hu-separator" />

        {/* SKU & Meta */}
        <div className="hu-meta">
          <p><strong>SKU:</strong> 1008969</p>
          <p><strong>CATEGORIAS:</strong> ALIMENTACION, COMIDA HUMEDA, PERRO</p>
          <p><strong>ETIQUETAS:</strong> GRAIN-FREE, PACK</p>
          <p><strong>MARCA:</strong> SENSE</p>
        </div>

        {/* Payment */}
        <div className="hu-payment-box">
          <p className="hu-payment-title">Pago seguro garantizado</p>
          <div className="hu-payment-icons">
            <div className="hu-pay-icon">VISA</div>
            <div className="hu-pay-icon mc">MC</div>
            <div className="hu-pay-icon gp">GPay</div>
            <div className="hu-pay-icon ap">Pay</div>
          </div>
        </div>

        {/* Features */}
        <div className="hu-features">
          <h4>Caracteristicas adicionales</h4>
          {[
            "Envio rapido en 24-48 horas",
            "Envios a toda Barcelona",
            "Satisfaccion garantizada",
            "Envio gratis a partir de 50 €",
            "Pago 100% seguro",
          ].map((f, i) => (
            <div key={i} className="hu-feature-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#22c55e"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm-2 17l-5-5 1.4-1.4L10 14.2l7.6-7.6L19 8l-9 9z"/></svg>
              <span>{f}</span>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="hu-tabs">
          <div className="hu-tab active">DESCRIPCION</div>
          <div className="hu-tab">INFO ADICIONAL</div>
          <div className="hu-tab">VALORACIONES (0)</div>
        </div>

        {/* Description content */}
        <div className="hu-desc-content">
          <p>Dibaq Sense Cochinillo de Segovia con Manzana y Zanahoria es una propuesta nutricional de alta gama disenada para perros adultos de todas las razas que buscan una alimentacion natural y exclusiva.</p>

          <h3>Descripcion de Dibaq Sense Cochinillo de Segovia</h3>
          <p>Este alimento humedo se cocina en las propias instalaciones de la marca, lo que permite mantener la cadena de frio de los ingredientes frescos y conservar todas sus propiedades nutricionales.</p>

          <h3>Beneficios</h3>
          <ul>
            <li><strong>Monoproteico:</strong> Utiliza unicamente cochinillo como fuente de proteina animal, minimizando riesgos de alergias.</li>
            <li><strong>Grain Free:</strong> Receta libre de cereales, gluten, maiz, soja y huevo para una digestion mas ligera.</li>
            <li><strong>Protectores Articulares:</strong> Incluye condroitina y glucosamina para fortalecer las articulaciones.</li>
            <li><strong>Ingredientes 100% Naturales:</strong> Con plantas prebioticas y antioxidantes naturales.</li>
          </ul>

          <h3>Ingredientes</h3>
          <p><strong>Composicion:</strong> Cochinillo segoviano fresco 76%, patata, verduras y frutas frescas 2%, aceite de salmon 1%, pack protector articular 0,5%.</p>

          <h3>Analisis nutricional</h3>
          <ul className="hu-nutrition">
            <li>Proteina bruta: 7%</li>
            <li>Grasa bruta: 6,5%</li>
            <li>Fibra bruta: 1,5%</li>
            <li>Materia inorganica: 1,5%</li>
            <li>Humedad: 79%</li>
            <li>Energia metabolizable: 955 kcal/kg</li>
          </ul>

          <h3>Tabla de alimentacion</h3>
          <table className="hu-feeding-table">
            <thead>
              <tr><th>PESO (KG)</th><th>RACION (G/DIA)</th></tr>
            </thead>
            <tbody>
              <tr><td>5 – 10</td><td>300 – 600</td></tr>
              <tr><td>10 – 20</td><td>600 – 975</td></tr>
              <tr><td>20 – 30</td><td>975 – 1600</td></tr>
              <tr><td>30 – 40</td><td>1600 – 2600</td></tr>
            </tbody>
          </table>
        </div>

        {/* Ficha Tecnica card */}
        <div className="hu-ficha-card">
          <div className="hu-ficha-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            <span>Ficha tecnica</span>
          </div>
          {[
            { label: "MARCA", value: "Sense" },
            { label: "REFERENCIA", value: "1008969" },
            { label: "TAMANOS", value: "6x380g, 12x380g, 380g" },
            { label: "ENVASE", value: "Lata" },
            { label: "TIPO DE COMIDA", value: "comida humeda" },
            { label: "EDAD DE PERROS", value: "Adulto" },
            { label: "UNIDADES", value: "1" },
          ].map((item, i) => (
            <div key={i} className={`hu-ficha-row ${i % 2 === 1 ? "shaded" : ""}`}>
              <span className="hu-ficha-label">{item.label}</span>
              <span className="hu-ficha-value">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Puntos Clave card */}
        <div className="hu-puntos-card">
          <div className="hu-puntos-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <span>Puntos clave</span>
          </div>
          {[
            { title: "Monoproteico:", desc: "Utiliza unicamente cochinillo como fuente de proteina animal, minimizando riesgos de alergias." },
            { title: "Grain Free:", desc: "Receta libre de cereales, gluten, maiz, soja y huevo para una digestion mas ligera." },
            { title: "Protectores Articulares:", desc: "Incluye condroitina y glucosamina para fortalecer las articulaciones y mejorar la movilidad." },
            { title: "Ingredientes 100% Naturales:", desc: "Con plantas prebioticas y antioxidantes naturales que refuerzan el sistema inmunitario." },
          ].map((pt, i) => (
            <div key={i} className="hu-punto-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#22c55e"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm-2 17l-5-5 1.4-1.4L10 14.2l7.6-7.6L19 8l-9 9z"/></svg>
              <p><strong>{pt.title}</strong> {pt.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom spacing */}
        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}
