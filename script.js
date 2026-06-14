/* =========================================================
   CAPITÁN BETO · Interactive State Machine
   ========================================================= */

(function () {
  "use strict";

  // ---------- Translations ----------
  const I18N = {
    es: {
      "ctrl.public": "Sitio Público",
      "ctrl.dashboard": "Backoffice",
      "ctrl.simulate": "Simular rol:",
      "nav.menu": "La Pizarra",
      "nav.pet": "Pet-Friendly",
      "nav.crew": "The Crew",
      "nav.momentos": "Momentos",
      "nav.gallery": "Galería",
      "momentos.eyebrow": "Momentos",
      "momentos.title": "El bar, contado en imágenes",
      "momentos.lead": "Cervezas tiradas con paciencia, vinos bien elegidos, el perro del barrio que ya es de la familia. Pequeñas escenas del día a día en Capitán Beto.",
      "momentos.k.video": "En vivo",     "momentos.t.video": "El bar en marcha",
      "momentos.k.vinos": "Bodega",      "momentos.t.vinos": "Ribera y Rioja, a copa",
      "momentos.k.cervezas": "Tirador",  "momentos.t.cervezas": "Cañas con espuma honesta",
      "momentos.k.cartel": "El cartel",  "momentos.t.cartel": "Pintado a mano",
      "momentos.k.puerta": "La puerta",  "momentos.t.puerta": "Pet-friendly · siempre abierto",
      "momentos.k.interior": "Comedor",  "momentos.t.interior": "El rincón verde",
      "momentos.k.fachada": "Calle",     "momentos.t.fachada": "Te esperamos",
      "momentos.k.barra": "La barra",    "momentos.t.barra": "Tu sitio favorito",
      "bpic.eyebrow": "Comunidad",
      "bpic.title": "¿Pasaste por acá? Subí tu <em>Beto's Pic</em>",
      "bpic.lead": "Sacate una foto en el bar, etiquetanos con <strong>#BetosPic</strong> y aparecés en nuestro Instagram. La mejor foto del mes se lleva una tabla del Capitán para dos.",
      "bpic.ctaIg": "Ver #BetosPic",
      "bpic.ctaUpload": "Subir mi foto",
      "bpic.ctaFollow": "Seguir @capitanbeto.bardetapas",
      "bpic.wallTitle": "El muro de los clientes",
      "bpic.count": "fotos compartidas",
      "bpic.modalEyebrow": "Beto's Pic",
      "bpic.modalTitle": "Subí tu foto",
      "bpic.modalLead": "Las mejores fotos del muro suben a nuestro Instagram al final del mes.",
      "bpic.drop": "Arrastra tu foto o haz click",
      "bpic.dropSub": "JPG · PNG · WEBP hasta 8 MB",
      "bpic.f.name": "Nombre (opcional)",
      "bpic.f.handle": "@instagram (opcional)",
      "bpic.f.caption": "Caption (opcional)",
      "bpic.consent": "Doy permiso para mostrar mi foto en el muro y en Instagram de Capitán Beto.",
      "bpic.cancel": "Cancelar",
      "bpic.submit": "Publicar foto",
      "crew.eyebrow": "Atendido por sus dueños",
      "crew.title": "The Crew",
      "crew.lead": "Detrás de cada tapa, cada cóctel y cada Fernet con Coca, una pareja que vive la taberna como su casa. Madrid y Buenos Aires en una misma barra.",
      "crew.cap1": "Frente a frente",
      "crew.cap2": "Detrás de la barra",
      "crew.roleUni": "Los dueños · Frente a frente y detrás de la barra",
      "crew.nameUni": "Matías & La Polaca",
      "crew.bioUni": "Argentinos los dos, madrileños de adopción. Matías y Natalia — «la Polaca» para los amigos — te reciben en la barra, te recomiendan el vino y se quedan a charlar. Desde el primer vermut del mediodía hasta el último Fernet de madrugada, arman los tragos, sirven las tapas y cierran el local. Aquí no hay personal: hay dueños abriéndote la puerta de su taberna. Capitán Beto se vive porque ellos lo viven.",
      "crew.sigUni": "«La taberna es como nuestra casa. Cada cóctel sale de nuestras manos. Pasá, sentate, contame.»",
      "crew.change": "Cambiar foto",
      "crew.saved": "Foto del Crew actualizada",
      "nav.hours": "Horarios",
      "nav.contact": "Contacto",
      "nav.cta": "Ver la Pizarra",
      "gallery.eyebrow": "Evento · 24 y 25 de marzo",
      "gallery.title": "El día a día en la taberna",
      "gallery.lead": "Una selección de la noche <strong>Argentina Soberana en Capitán Beto</strong>. Fotos de <a href=\"https://instagram.com/maderenaudier\" target=\"_blank\" rel=\"noopener\" class=\"cta-link\">@maderenaudier</a>.",
      "gallery.viewAll": "Ver las 168 fotos en Drive",
      "gallery.followPhoto": "Seguir al fotógrafo",
      "ig.edit": "Editar feed",
      "ig.done": "Listo",
      "ig.hint": "Modo edición: arrastra fotos sobre el grid o haz click en cualquier hueco para añadir. Click en × para borrar. Termina con «Listo».",
      "ig.added": "{{n}} foto(s) añadida(s) al feed",
      "ig.deleted": "Foto eliminada del feed",
      "gallery.igSub": "Tapas castizas · sabor argentino · Madrid",
      "gallery.follow": "Seguir en Instagram",
      "gallery.communityTitle": "Sube tus fotos",
      "gallery.drop": "Arrastra tus fotos aquí o haz click para subir",
      "gallery.formats": "JPG · PNG · WEBP · HEIC — hasta 8 MB cada una",
      "gallery.multi": "Puedes seleccionar varias a la vez",
      "gallery.empty": "Todavía no hay fotos. ¡Sé el primero en compartir!",
      "gallery.added": "{{n}} foto(s) añadida(s)",
      "gallery.tooBig": "{{name}} es demasiado grande (máx 8 MB)",
      "gallery.notImg": "{{name}} no es una imagen",
      "gallery.delConfirm": "¿Eliminar esta foto?",
      "brand.sub": "Gastro Taberna",
      "demo.toggle": "Demo",
      "ctrl.view": "Vista",
      "nav.experience": "La Experiencia",
      "nav.reserve": "Reservar mesa",
      "hero.pill": "Gastro Taberna · Fusión Española & Argentina",
      "hero.eyebrow": "Gastro Taberna · Madrid",
      "hero.title1": "Dos mundos.",
      "hero.title2": "Un solo sabor.",
      "hero.subtitle": "Donde las tapas castizas abrazan el fuego de Buenos Aires. Atendidos por sus propios dueños, para que cada visita se sienta como volver a casa.",
      "hero.ctaMenu": "Ver la Pizarra",
      "hero.ctaBook": "Reservar mesa",
      "hero.live": "Promo en directo · Empanadas (×3) + Malbec 9€",
      "menu.eyebrow": "La Pizarra",
      "menu.title": "Hoy en la barra",
      "menu.lead": "Precios honestos. Producto cercano. Cambia cada semana, como en cualquier tasca que se precie.",
      "menu.tabShare": "Para Compartir",
      "menu.tabTapas": "Nuestras Tapas",
      "menu.tabBodega": "Bodega",
      "menu.tabSpirits": "Destilados",
      "pet.eyebrow": "Bienvenidos en todo el bar",
      "pet.title": "Espacio Pet-Friendly",
      "pet.lead": "Todos los animales son bienvenidos en todo el local. Perros, gatos, conejos, hurones... si viene contigo, viene con nosotros. Sobremesa eterna para humanos y peludos.",
      "pet.badge": "100% Pet-Friendly",
      "pet.c1.t": "Agua siempre fresca",
      "pet.c1.d": "Cuencos en cada zona del bar. Cambiamos el agua varias veces al día.",
      "pet.c2.t": "Snacks caseros",
      "pet.c2.d": "Galletas sin sal ni azúcar, horneadas por la Polaca. Pedinos cuando quieras.",
      "pet.c3.t": "Rincones tranquilos",
      "pet.c3.d": "Mesas con sombra, lejos del paso. Ideal para peludos tímidos o mayores.",
      "pet.c4.t": "Todos son bienvenidos",
      "pet.c4.d": "Perros, gatos, conejos, hurones, aves. Sin restricciones de tamaño ni raza.",
      "pet.cta.t": "¿Vienes con tu peludo?",
      "pet.cta.d": "Avísanos al reservar y te guardamos un rincón tranquilo con cuenco listo.",
      "pet.cta.btn": "Reservar con peludo",
      "pet.counter.t": "peludos posaron en Capitán Beto",
      "pet.counter.d": "todas las fotos las sacan los clientes desde el bar · sumá la tuya",
      "pet.gal.eyebrow": "Manada del Capitán",
      "pet.gal.title": "Fotos sacadas en el bar",
      "pet.gal.lead": "Vení con tu peludo, sacate una foto en la barra o en la mesa, y sumala a la manada del Capitán.",
      "pet.gal.share": "📷 Subir foto del bar",
      "pet.review.t": "¿Pasaste un buen rato con tu peludo?",
      "pet.review.d": "Dejanos una reseña en Google. Nos ayuda muchísimo y a otros peludos a encontrar su bar favorito en Madrid.",
      "pet.review.btn": "Reseñar en Google",
      "dash.ch.googleReviewUrl": "URL del enlace \"Dejá tu reseña\"",
      "dash.ch.googleReviewNote": "Pegá la URL \"Dejar reseña\" que te da Google Business Profile. La usás en el botón del público y al pegarse acá se actualiza el botón de \"Reseñar en Google\" del sitio.",
      "dash.ch.openBP": "Abrir Google Business",
      "dash.ch.pending": "Configurar",
      "pet.up.eyebrow": "Compartí tu peludo",
      "pet.up.title": "Sumá tu peludo a la manada",
      "pet.up.lead": "Subí una foto y el nombre de tu compañero/a peludo/a. Aparece en la galería al instante.",
      "pet.up.fName": "Nombre del peludo",
      "pet.up.fOwner": "Tu nombre (opcional)",
      "pet.up.fBreed": "Raza o especie (opcional)",
      "pet.up.drop": "Arrastrá la foto aquí",
      "pet.up.or": "o hacé clic para elegir",
      "pet.up.formats": "JPG · PNG · HEIC (iPhone) · WebP · AVIF · GIF — hasta 25 MB",
      "pet.up.cancel": "Cancelar",
      "pet.up.send": "Compartir mi peludo",
      "pride.text": "Todos son bienvenidos · All are welcome",
      "pride.short": "Todos son bienvenidos",
      "gallery.photoBy": "Fotografía por",
      "hours.eyebrow": "Doble turno madrileño",
      "hours.title": "Horarios",
      "contact.eyebrow": "Pasa a vernos",
      "contact.title": "Calle de los Hidalgos, Madrid",
      "contact.lead": "Reservas por WhatsApp o mándanos un DM en Instagram. Si llamas, contesta Beto.",
      "footer.small": "Hecho con sobremesa y vermut.",
      "wa.label": "Escríbenos",

      "dash.sidebarSub": "Backoffice",
      "dash.loggedAs": "Conectado como:",
      "dash.nav.inventory": "Inventario",
      "dash.nav.promos": "Promociones",
      "dash.nav.hours": "Horarios",
      "dash.nav.channels": "Canales",
      "dash.nav.design": "Diseño",
      "dash.nav.payments": "Pagos & Integraciones",
      "dash.nav.pets": "Peludos",
      "dash.nav.backup": "Backup CMS",
      "dash.nav.stats": "Estadísticas",
      "dash.nav.consumption": "Consumos",
      "dash.title.backup": "Backup del contenido",
      "dash.title.stats": "Estadísticas y proyecciones",
      "dash.title.consumption": "Registro de consumos",
      "dash.stats.title": "📊 Estadísticas en tiempo real",
      "dash.stats.sub": "Datos directos del backend Supabase. Cambian al loguear consumos.",
      "dash.stats.daily": "Revenue diario + proyección",
      "dash.stats.top": "Top platos por revenue",
      "dash.stats.heatmap": "Heatmap horario · día × hora (Madrid)",
      "dash.consumption.title": "🧾 Registro de consumos",
      "dash.consumption.sub": "Logueá ventas manualmente o importá CSV de tu POS. Alimenta el panel de Estadísticas.",
      "dash.consumption.add": "+ Registrar consumo",
      "dash.backup.title": "💾 Backup del contenido editable",
      "dash.backup.sub": "Descargá un JSON con TODO lo que editaste desde el dashboard. Importá para restaurar en otro navegador o tras reinstalar.",
      "dash.backup.export": "⬇️ Descargar backup (.json)",
      "dash.backup.import": "⬆️ Restaurar desde archivo",
      "dash.backup.clear": "🗑 Borrar TODO el contenido editado",
      "dash.backup.note": "Sin backend, todo lo que editás vive sólo en este navegador. Hacé export periódicamente. Los archivos NO contienen claves de pago — solo contenido visible.",
      "dash.pets.title": "🐾 Peludos del Capitán",
      "dash.pets.sub": "Fotos subidas por los clientes. Aprobá, edita o eliminá. Aparecen en la galería pública al instante una vez aprobadas.",
      "dash.pets.add": "+ Subir foto",
      "dash.pets.total": "Total subidos",
      "dash.pets.pending": "Pendientes",
      "dash.pets.approved": "Aprobados",
      "dash.foot": "Madrid · doble turno",
      "dash.title.kicker": "Panel de gestión",
      "dash.title.inventory": "Inventario de Cocina",
      "dash.title.promos": "Promociones en directo",
      "dash.title.hours": "Horarios y turnos",
      "dash.title.channels": "Canales de comunicación",
      "dash.title.design": "Diseño visual del sitio",
      "dash.title.payments": "Pagos & Integraciones",
      "dash.title.pets": "Peludos del Capitán",
      "dash.title.content": "Editor de contenido",
      "dash.title.reservations": "Reservas",
      "dash.title.wall": "Muro #BetosPic",
      "dash.title.images": "Imágenes del sitio",
      "dash.nav.images": "Imágenes",
      "login.title": "Backoffice de Capitán Beto",
      "login.lead": "Solo los dueños pueden editar el contenido. Identificate con tu cuenta de Google autorizada.",
      "login.fallback": "¿Problemas con Google? Configurá tu Client ID en el código (ver SECURITY.md).",
      "login.warn": "Este es un sitio estático sin backend. La autenticación verifica tu email con Google, pero el «guard» del dashboard puede ser bypassado por usuarios técnicos. No se almacenan datos sensibles del bar fuera de tu navegador.",
      "login.back": "Volver al sitio público",
      "dash.img.title": "Imágenes del sitio",
      "dash.img.sub": "Hacé hover sobre cualquier imagen y reemplazala. Se guarda en tu navegador y aparece al instante en el sitio público.",
      "dash.title.customers": "Clientes registrados",
      "dash.nav.customers": "Clientes",
      "dash.cust.title": "Clientes registrados",
      "dash.cust.sub": "Solo aparecen aquí quienes aceptaron explícitamente recibir comunicaciones. Cumplimos RGPD.",
      "nav.account": "Mi cuenta",
      "cookie.title": "🍪 Usamos cookies",
      "cookie.lead": "Usamos cookies para que la web funcione, recordar tu idioma y mejorar tu experiencia. Tu eliges qué aceptás.",
      "cookie.config": "Configurar",
      "cookie.minimal": "Solo necesarias",
      "cookie.acceptAll": "Aceptar todas",
      "cookie.rejectAll": "Rechazar todo",
      "cookie.savePrefs": "Guardar preferencias",
      "cookie.modalTitle": "Configurar cookies",
      "cookie.modalLead": "Elegí qué tipo de cookies aceptás. Las necesarias son obligatorias para que la web funcione.",
      "cookie.always": "Siempre",
      "cookie.cat.nec": "Necesarias",
      "cookie.cat.necSub": "Funcionamiento del sitio, idioma, sesión. No identifican personalmente.",
      "cookie.cat.func": "Funcionales",
      "cookie.cat.funcSub": "Guardar tus preferencias (fotos del muro, reservas, configuraciones del dashboard).",
      "cookie.cat.ana": "Analíticas",
      "cookie.cat.anaSub": "Saber qué secciones ves más y mejorar la web. Datos agregados, sin identificarte.",
      "cookie.cat.mkt": "Marketing",
      "cookie.cat.mktSub": "Personalizar promociones y enviarte ofertas si das tus datos en «Mi cuenta».",
      "footer.contact": "Contacto",
      "footer.legal": "Legal",
      "footer.business": "Empresa",
      "footer.aviso": "Aviso Legal",
      "footer.privacy": "Política de Privacidad",
      "footer.cookies": "Política de Cookies",
      "footer.terms": "Términos y Condiciones",
      "footer.cookieConfig": "⚙️ Configurar cookies",
      "footer.admin": "Admin",
      "footer.cif": "Razón social:",
      "footer.regist": "Registro Mercantil:",
      "footer.responsable": "Responsable de datos:",
      "footer.rights": "Todos los derechos reservados",
      "customer.eyebrow": "Comunidad Capitán Beto",
      "customer.title": "Mi cuenta",
      "customer.lead": "Registrate para recibir promos exclusivas, descuentos de cumpleaños y novedades del bar. Solo te escribimos si dijiste que sí.",
      "customer.tabSignup": "Registrarme",
      "customer.tabSignin": "Ya tengo cuenta",
      "customer.f.name": "Nombre",
      "customer.f.phone": "Teléfono",
      "customer.f.email": "Email",
      "customer.f.birthday": "Cumpleaños (opcional · descuento gratis)",
      "customer.f.prefs": "¿Qué te gusta?",
      "customer.optEmail": "Quiero recibir promos y novedades por email.",
      "customer.optWa": "Quiero recibir avisos por WhatsApp (cumpleaños, eventos especiales).",
      "customer.consent": "He leído y acepto la Política de Privacidad y los Términos. Mis datos los guardará Capitán Beto solo para los fines indicados.",
      "customer.signinHint": "Te identificamos por email (sin contraseña). Tu info se sincroniza con el navegador.",
      "customer.cancel": "Cancelar",
      "customer.create": "Crear cuenta",
      "customer.signin": "Entrar",
      "customer.pill": "Mi cuenta",
      "dash.nav.content": "Contenido",
      "dash.nav.reservations": "Reservas",
      "dash.nav.wall": "Wall #BetosPic",
      "dash.content.title": "Editor de contenido",
      "dash.content.sub": "Todo lo que cambies se guarda en el navegador y se aplica al sitio público al instante.",
      "dash.resv.title": "Reservas recibidas",
      "dash.resv.sub": "Las reservas se guardan localmente. Si el cliente confirma por WhatsApp, Google Calendar o email, también las recibís ahí.",
      "dash.wall.title": "Muro #BetosPic",
      "dash.wall.sub": "Las fotos que suben los clientes desde el sitio público. Podés eliminarlas si son spam.",
      "dash.search": "Buscar plato, categoría, alérgeno…",
      "dash.addProduct": "+ Nuevo Plato",
      "dash.kpi.products": "Platos activos",
      "dash.kpi.outstock": "Sin stock",
      "dash.kpi.review": "revisar",
      "dash.kpi.promos": "Promos LIVE",
      "dash.kpi.airing": "al aire",
      "dash.kpi.shift": "Turno actual",
      "dash.inv.table": "Gestión de cocina",
      "dash.inv.roView": "Modo Camarero · sólo consulta",
      "dash.inv.roEditor": "Modo Editor · sin cambios de precio",
      "dash.th.title": "Plato",
      "dash.th.cat": "Categoría",
      "dash.th.base": "Precio Base",
      "dash.th.terr": "Precio Terraza",
      "dash.th.allerg": "Alérgenos",
      "dash.th.stock": "Stock",
      "dash.th.act": "Acciones",
      "dash.promo.p1.title": "Empanadas + Malbec",
      "dash.promo.p1.desc": "3 empanadas criollas + copa de Malbec por 9€. Lunes a jueves de 18 a 20h.",
      "dash.promo.p2.title": "Provoleta + Vermut",
      "dash.promo.p2.desc": "Provoleta a la parrilla + vermut de grifo por 12€ todo el sábado.",
      "dash.promo.edit": "Editar",
      "dash.promo.new": "Nueva promoción",
      "dash.hours.title": "Doble turno madrileño",
      "dash.hours.sub": "Ajusta cocina y barra · comidas y cenas",
      "dash.hours.save": "Guardar horarios",
      "dash.ch.connected": "Conectado",
      "dash.ch.number": "Número activo",
      "dash.ch.greeting": "Saludo automático",
      "dash.ch.greetingVal": "¡Buenas! Soy Beto. ¿Reserva, takeaway o consulta de la pizarra?",
      "dash.ch.save": "Guardar canal",
      "dash.ch.test": "Probar enlace",
      "dash.ch.handle": "Perfil",
      "dash.ch.url": "URL pública",
      "dash.ch.open": "Abrir perfil",
      "dash.ch.email": "Email para notificaciones de reserva",
      "dash.ch.calendar": "Calendario invitado en cada reserva",
      "dash.ch.emailNote": "Las reservas web envían: email a este buzón vía FormSubmit, invitación de Google Calendar como attendee, y resumen por WhatsApp con transcript. La primera vez que entre un mail, abre el inbox y confirma el activation link de FormSubmit.",
      "dash.ch.openCal": "Abrir Google Calendar",

      "cat.share": "Para Compartir",
      "cat.tapas": "Nuestras Tapas",
      "cat.bodega": "Bodega",
      "cat.spirits": "Destilados",
      "toast.langSwitched": "Idioma cambiado a Español",
      "toast.roleSwitched": "Rol activo:",
      "toast.viewSwitched": "Vista:",
      "toast.priceSaved": "Precio actualizado",
      "toast.stockToggled": "Stock actualizado",
      "toast.allergenToggled": "Alérgeno actualizado",
      "toast.deleted": "Plato eliminado",
      "toast.added": "Plato añadido a la pizarra",
      "toast.savedHours": "Horarios guardados",
      "toast.savedPromo": "Promoción guardada",
      "toast.noPerm": "Acción no permitida para este rol",

      "reserveCta.eyebrow": "Reserva tu mesa",
      "reserveCta.title": "Asegura tu sitio en la pizarra",
      "reserveCta.lead": "Reserva en 20 segundos. Te confirmamos por WhatsApp y te añadimos al calendario.",
      "reserveCta.btn": "Reservar ahora",
      "reserveCta.small": "Confirmación inmediata · Sin tarjeta",

      "reserve.eyebrow": "Reserva express",
      "reserve.title": "Tu mesa en Capitán Beto",
      "reserve.lead": "Rellena en 20 segundos. Te enviamos confirmación por WhatsApp y un enlace para añadirlo a Google Calendar.",
      "reserve.f.name": "Nombre",
      "reserve.f.phone": "Teléfono (WhatsApp)",
      "reserve.f.email": "Email (opcional)",
      "reserve.email": "Confirmar por email",
      "toast.emailSent": "Reserva enviada por email al bar ✉️",
      "toast.emailFallback": "Abriendo tu cliente de email...",
      "reserve.f.date": "Fecha",
      "reserve.f.time": "Hora",
      "reserve.f.people": "Comensales",
      "reserve.f.where": "¿Dónde?",
      "reserve.f.terraza": "Terraza · pet-friendly",
      "reserve.f.barra": "Barra",
      "reserve.f.comedor": "Comedor",
      "reserve.f.notes": "Notas (alergias, ocasión...)",
      "reserve.next": "Revisar reserva",
      "reserve.back": "Atrás",
      "reserve.send": "Enviar por WhatsApp",
      "reserve.cal": "Añadir a Google Calendar",
      "reserve.foot": "Te contestamos en menos de 10 minutos. Si lo prefieres, puedes hablar directo con un camarero.",

      "chat.headerName": "Beto · Asistente",
      "chat.headerStatus": "En línea · responde al instante",
      "chat.humanPill": "Persona",
      "chat.input": "Escribe tu pregunta...",
      "chat.welcome": "¡Buenas! Soy Beto, el asistente de la taberna 🍷 Tapas castizas con un toque argentino. ¿En qué te ayudo? Si en algún momento prefieres hablar con una persona real, toca «Persona» arriba.",
      "chat.handover.title": "Conectándote con un camarero",
      "chat.handover.subtitle": "Te respondemos en WhatsApp en <10 min",
      "chat.handover.body": "Estamos enviando el contexto de esta conversación al equipo para que no tengas que repetir nada.",
      "chat.handover.cta": "Abrir WhatsApp",
      "chat.handover.foot": "WhatsApp Business · +34 611 854 380",
      "chat.handover.systemNote": "Resumen enviado al camarero por WhatsApp",
      "chat.escalateAuto": "No quiero hacerte perder tiempo. Te paso con un camarero real que seguro te ayuda mejor 👇",
      "wa.transcript.header": "— Resumen de la conversación con Beto (chatbot web) —",
      "wa.transcript.you": "Cliente",
      "wa.transcript.bot": "Beto (bot)",
      "chat.q.reserve": "Quiero reservar",
      "chat.q.hours": "Horarios",
      "chat.q.location": "¿Dónde estáis?",
      "chat.q.pet": "¿Aceptáis mascotas?",
      "chat.q.menu": "¿Qué hay hoy?",
      "chat.q.allergens": "Alérgenos",
      "chat.q.human": "Hablar con persona",
      "chat.a.hours": "Cocina abre en doble turno madrileño: 13:00 a 16:30 (comidas) y 20:00 a 23:30 (cenas). Los findes alargamos hasta la 01:30. ¿Quieres reservar para algún día concreto?",
      "chat.a.location": "Estamos en Calle de los Hidalgos, Madrid. Metro más cercano La Latina, a 4 minutos andando. ¿Te paso ubicación de Google Maps?",
      "chat.a.pet": "¡Por supuesto! Somos 100% pet-friendly: todos los animales son bienvenidos en todo el bar. Cuencos de agua en cada zona, snacks caseros sin sal ni azúcar horneados por la Polaca, rincones tranquilos con sombra. Perros, gatos, conejos, hurones, aves... si viene contigo, viene con nosotros. ¿Reservamos mesa?",
      "chat.a.menu": "Hoy en la pizarra: provoleta a la parrilla, empanadas criollas, milanesa napolitana, choripán y vermut de grifo. Cambia cada semana. ¿Te paso la pizarra completa?",
      "chat.a.allergens": "Marcamos gluten, lácteos, huevo, pescado, moluscos, sulfitos y frutos secos en todos los platos. Cuéntame qué alergia tienes y te recomiendo.",
      "chat.a.human": "Te paso con un camarero real ahora mismo. Te abre el chat de WhatsApp con +34 611 854 380 para que sigáis ahí 👇",
      "chat.a.reserveStart": "¡Hagamos esa reserva! Te abro el formulario rápido (20 segundos) o si prefieres me lo cuentas por aquí.",
      "chat.cta.openForm": "Abrir formulario de reserva",
      "chat.cta.contWa": "Continuar en WhatsApp",
      "chat.cta.maps": "Ver Google Maps",
      "chat.cta.menu": "Ver la Pizarra",
      "chat.unknown": "Mmm, no estoy seguro de eso. ¿Quieres que te ponga con un camarero real?",
      "chat.human.intro": "Te conecto con el equipo de Capitán Beto por WhatsApp. Tu pregunta:",
      "chat.confirm.wa": "Listo. Te he abierto WhatsApp con el resumen de tu reserva. Si no se abrió, puedes copiar el enlace.",

      "wa.bot.summary": "Hola, soy {{name}}. Quiero reservar mesa en Capitán Beto:",
      "wa.bot.human": "Hola Capitán Beto, vengo del chat de la web y necesito hablar con una persona. Mi consulta:"
    },
    en: {
      "ctrl.public": "Public Site",
      "ctrl.dashboard": "Backoffice",
      "ctrl.simulate": "Simulate role:",
      "nav.menu": "The Slate",
      "nav.pet": "Pet-Friendly",
      "nav.crew": "The Crew",
      "nav.momentos": "Moments",
      "nav.gallery": "Gallery",
      "momentos.eyebrow": "Moments",
      "momentos.title": "The bar, told in photos",
      "momentos.lead": "Slowly-pulled beers, carefully picked wines, the neighbourhood dog who's already family. Little scenes from daily life at Capitán Beto.",
      "momentos.k.video": "Live",        "momentos.t.video": "The bar in motion",
      "momentos.k.vinos": "Cellar",      "momentos.t.vinos": "Ribera & Rioja, by the glass",
      "momentos.k.cervezas": "On tap",   "momentos.t.cervezas": "Honest foam, every time",
      "momentos.k.cartel": "The sign",   "momentos.t.cartel": "Hand-painted",
      "momentos.k.puerta": "The door",   "momentos.t.puerta": "Pet-friendly · always open",
      "momentos.k.interior": "Dining",   "momentos.t.interior": "The green corner",
      "momentos.k.fachada": "Street",    "momentos.t.fachada": "We're waiting",
      "momentos.k.barra": "The bar",     "momentos.t.barra": "Your favourite seat",
      "bpic.eyebrow": "Community",
      "bpic.title": "Came by? Drop your <em>Beto's Pic</em>",
      "bpic.lead": "Snap a photo at the bar, tag us with <strong>#BetosPic</strong> and appear on our Instagram. Best photo of the month wins a Captain's Board for two.",
      "bpic.ctaIg": "See #BetosPic",
      "bpic.ctaUpload": "Upload my photo",
      "bpic.ctaFollow": "Follow @capitanbeto.bardetapas",
      "bpic.wallTitle": "The customers' wall",
      "bpic.count": "photos shared",
      "bpic.modalEyebrow": "Beto's Pic",
      "bpic.modalTitle": "Upload your photo",
      "bpic.modalLead": "The best photos on the wall make it to our Instagram at the end of the month.",
      "bpic.drop": "Drag your photo or click",
      "bpic.dropSub": "JPG · PNG · WEBP up to 8 MB",
      "bpic.f.name": "Name (optional)",
      "bpic.f.handle": "@instagram (optional)",
      "bpic.f.caption": "Caption (optional)",
      "bpic.consent": "I allow my photo to be displayed on the wall and on Capitán Beto's Instagram.",
      "bpic.cancel": "Cancel",
      "bpic.submit": "Publish photo",
      "crew.eyebrow": "Run by the owners",
      "crew.title": "The Crew",
      "crew.lead": "Behind every tapa, every cocktail and every Fernet & Coke, a couple who lives the taberna like their own home. Madrid and Buenos Aires at the same bar.",
      "crew.cap1": "Face to face",
      "crew.cap2": "Behind the bar",
      "crew.roleUni": "The owners · Face to face and behind the bar",
      "crew.nameUni": "Matías & La Polaca",
      "crew.bioUni": "Both Argentine, Madrid by adoption. Matías and Natalia — «la Polaca» to friends — welcome you at the bar, pick your wine and stay for a chat. From the first vermouth at midday to the last Fernet at dawn, they build the cocktails, plate the tapas, lock the door at night. No staff here — just owners opening their taberna to you. Capitán Beto lives because they live it.",
      "crew.sigUni": "«This bar is our home. Every cocktail comes from our hands. Come in, sit down, talk to us.»",
      "crew.change": "Change photo",
      "crew.saved": "Crew photo updated",
      "nav.hours": "Hours",
      "nav.contact": "Contact",
      "nav.cta": "View the Slate Menu",
      "gallery.eyebrow": "Event · 24-25 March",
      "gallery.title": "A day at the taberna",
      "gallery.lead": "A selection from the <strong>Argentina Soberana</strong> night at Capitán Beto. Photos by <a href=\"https://instagram.com/maderenaudier\" target=\"_blank\" rel=\"noopener\" class=\"cta-link\">@maderenaudier</a>.",
      "gallery.viewAll": "See all 168 photos on Drive",
      "gallery.followPhoto": "Follow the photographer",
      "ig.edit": "Edit feed",
      "ig.done": "Done",
      "ig.hint": "Edit mode: drag photos onto the grid or click any empty spot to add. Click × to remove. Hit «Done» when finished.",
      "ig.added": "{{n}} photo(s) added to the feed",
      "ig.deleted": "Photo removed from feed",
      "gallery.igSub": "Castizo tapas · Argentine soul · Madrid",
      "gallery.follow": "Follow on Instagram",
      "gallery.communityTitle": "Upload your photos",
      "gallery.drop": "Drag your photos here or click to upload",
      "gallery.formats": "JPG · PNG · WEBP · HEIC — up to 8 MB each",
      "gallery.multi": "You can pick several at once",
      "gallery.empty": "No photos yet. Be the first to share!",
      "gallery.added": "{{n}} photo(s) added",
      "gallery.tooBig": "{{name}} is too large (max 8 MB)",
      "gallery.notImg": "{{name}} is not an image",
      "gallery.delConfirm": "Delete this photo?",
      "brand.sub": "Gastro Taberna",
      "demo.toggle": "Demo",
      "ctrl.view": "View",
      "nav.experience": "The Experience",
      "nav.reserve": "Book a table",
      "hero.pill": "Gastro Taberna · Spanish & Argentine Fusion",
      "hero.eyebrow": "Gastro Taberna · Madrid",
      "hero.title1": "Two worlds.",
      "hero.title2": "One flavour.",
      "hero.subtitle": "Where castizo tapas meet the fire of Buenos Aires. Run by the owners themselves, so every visit feels like coming home.",
      "hero.ctaMenu": "View the Slate Menu",
      "hero.ctaBook": "Book a table",
      "hero.live": "Live deal · Empanadas (×3) + Malbec glass 9€",
      "menu.eyebrow": "The Slate",
      "menu.title": "Tonight at the bar",
      "menu.lead": "Honest prices. Local produce. Changes every week, like any tavern worth its salt.",
      "menu.tabShare": "To Share",
      "menu.tabTapas": "Our Tapas",
      "menu.tabBodega": "Cellar",
      "menu.tabSpirits": "Spirits",
      "pet.eyebrow": "Welcome everywhere in the bar",
      "pet.title": "Pet-Friendly Space",
      "pet.lead": "All animals are welcome anywhere in the bar. Dogs, cats, rabbits, ferrets... if it comes with you, it comes with us. Endless after-meal talks for humans and furry friends.",
      "pet.badge": "100% Pet-Friendly",
      "pet.c1.t": "Fresh water always",
      "pet.c1.d": "Bowls in every area of the bar. We refill the water several times a day.",
      "pet.c2.t": "Homemade snacks",
      "pet.c2.d": "Cookies with no salt or sugar, baked by la Polaca. Just ask when you arrive.",
      "pet.c3.t": "Quiet corners",
      "pet.c3.d": "Shaded tables, away from the bustle. Great for shy or senior furry friends.",
      "pet.c4.t": "Everyone is welcome",
      "pet.c4.d": "Dogs, cats, rabbits, ferrets, birds. No size or breed restrictions.",
      "pet.cta.t": "Coming with your furry friend?",
      "pet.cta.d": "Let us know when you book and we'll save a quiet spot with a bowl ready.",
      "pet.cta.btn": "Book with my pet",
      "pet.counter.t": "furry friends posed at Capitán Beto",
      "pet.counter.d": "every photo is taken by customers right at the bar · add yours",
      "pet.gal.eyebrow": "The Captain's pack",
      "pet.gal.title": "Photos taken at the bar",
      "pet.gal.lead": "Come with your furry friend, snap a photo at the bar or the table, and add it to the Captain's pack.",
      "pet.gal.share": "📷 Upload photo from the bar",
      "pet.review.t": "Had a great time with your furry friend?",
      "pet.review.d": "Leave us a Google review. It helps us a lot and helps other furry friends find their favorite Madrid bar.",
      "pet.review.btn": "Review us on Google",
      "dash.ch.googleReviewUrl": "Public \"Leave a review\" URL",
      "dash.ch.googleReviewNote": "Paste the \"Write a review\" URL from your Google Business Profile. It updates the public \"Review us on Google\" button instantly.",
      "dash.ch.openBP": "Open Google Business",
      "dash.ch.pending": "Set up",
      "pet.up.eyebrow": "Share your furry friend",
      "pet.up.title": "Add your furry friend to the pack",
      "pet.up.lead": "Upload a photo and the name of your furry companion. It shows in the gallery instantly.",
      "pet.up.fName": "Pet's name",
      "pet.up.fOwner": "Your name (optional)",
      "pet.up.fBreed": "Breed or species (optional)",
      "pet.up.drop": "Drag the photo here",
      "pet.up.or": "or click to browse",
      "pet.up.formats": "JPG · PNG · HEIC (iPhone) · WebP · AVIF · GIF — up to 25 MB",
      "pet.up.cancel": "Cancel",
      "pet.up.send": "Share my furry friend",
      "pride.text": "All are welcome · Todos son bienvenidos",
      "pride.short": "All are welcome",
      "gallery.photoBy": "Photography by",
      "hours.eyebrow": "Madrid double-shift",
      "hours.title": "Opening hours",
      "contact.eyebrow": "Come see us",
      "contact.title": "Calle de los Hidalgos, Madrid",
      "contact.lead": "Reservations on WhatsApp or DM us on Instagram. If you call, Beto picks up.",
      "footer.small": "Made with after-meal talks and vermouth.",
      "wa.label": "Message us",

      "dash.sidebarSub": "Backoffice",
      "dash.loggedAs": "Logged in as:",
      "dash.nav.inventory": "Inventory",
      "dash.nav.promos": "Promotions",
      "dash.nav.hours": "Hours",
      "dash.nav.channels": "Channels",
      "dash.nav.design": "Design",
      "dash.nav.payments": "Payments & Integrations",
      "dash.nav.pets": "Furry friends",
      "dash.nav.backup": "CMS Backup",
      "dash.nav.stats": "Stats",
      "dash.nav.consumption": "Sales log",
      "dash.title.backup": "Content backup",
      "dash.title.stats": "Stats & forecast",
      "dash.title.consumption": "Sales log",
      "dash.stats.title": "📊 Real-time stats",
      "dash.stats.sub": "Live from the Supabase backend. Updates as you log sales.",
      "dash.stats.daily": "Daily revenue + forecast",
      "dash.stats.top": "Top dishes by revenue",
      "dash.stats.heatmap": "Hourly heatmap · day × hour (Madrid)",
      "dash.consumption.title": "🧾 Sales log",
      "dash.consumption.sub": "Log sales manually or import CSV from your POS. Feeds the Stats panel.",
      "dash.consumption.add": "+ Log sale",
      "dash.backup.title": "💾 Backup of editable content",
      "dash.backup.sub": "Download a JSON with EVERYTHING you've edited from the dashboard. Import to restore in another browser or after a reinstall.",
      "dash.backup.export": "⬇️ Download backup (.json)",
      "dash.backup.import": "⬆️ Restore from file",
      "dash.backup.clear": "🗑 Wipe ALL edited content",
      "dash.backup.note": "Without a backend, everything you edit lives in this browser only. Export periodically. Files do NOT contain payment keys — only visible content.",
      "dash.pets.title": "🐾 Captain's furry friends",
      "dash.pets.sub": "Photos uploaded by customers. Approve, edit or remove. They appear in the public gallery once approved.",
      "dash.pets.add": "+ Upload photo",
      "dash.pets.total": "Total uploaded",
      "dash.pets.pending": "Pending",
      "dash.pets.approved": "Approved",
      "dash.foot": "Madrid · double shift",
      "dash.title.kicker": "Management panel",
      "dash.title.inventory": "Kitchen Inventory",
      "dash.title.promos": "Live promotions",
      "dash.title.hours": "Hours & shifts",
      "dash.title.channels": "Communication channels",
      "dash.title.design": "Site visual design",
      "dash.title.payments": "Payments & Integrations",
      "dash.title.pets": "Captain's furry friends",
      "dash.title.content": "Content editor",
      "dash.title.reservations": "Reservations",
      "dash.title.wall": "#BetosPic Wall",
      "dash.title.images": "Site images",
      "dash.nav.images": "Images",
      "login.title": "Capitán Beto Backoffice",
      "login.lead": "Only the owners can edit content. Sign in with your authorised Google account.",
      "login.fallback": "Trouble with Google? Set your Client ID in the code (see SECURITY.md).",
      "login.warn": "This is a static site with no backend. Auth verifies your Google email, but the dashboard guard can be bypassed by technical users. No sensitive bar data is stored outside your browser.",
      "login.back": "Back to public site",
      "dash.img.title": "Site images",
      "dash.img.sub": "Hover any image and replace it. Saved in your browser and applied to the live site instantly.",
      "dash.nav.content": "Content",
      "dash.nav.reservations": "Reservations",
      "dash.nav.wall": "#BetosPic Wall",
      "dash.content.title": "Content editor",
      "dash.content.sub": "Anything you change is saved in your browser and applied to the live site instantly.",
      "dash.resv.title": "Received bookings",
      "dash.resv.sub": "Bookings are saved locally. If the customer confirms via WhatsApp, Google Calendar or email, you also get them there.",
      "dash.wall.title": "#BetosPic Wall",
      "dash.wall.sub": "Photos uploaded by customers from the public site. Delete spam if needed.",
      "dash.search": "Search dish, category, allergen…",
      "dash.addProduct": "+ New Dish",
      "dash.kpi.products": "Active dishes",
      "dash.kpi.outstock": "Out of stock",
      "dash.kpi.review": "review",
      "dash.kpi.promos": "LIVE deals",
      "dash.kpi.airing": "on air",
      "dash.kpi.shift": "Current shift",
      "dash.inv.table": "Kitchen management",
      "dash.inv.roView": "Waiter mode · read-only",
      "dash.inv.roEditor": "Editor mode · no price changes",
      "dash.th.title": "Dish",
      "dash.th.cat": "Category",
      "dash.th.base": "Base Price",
      "dash.th.terr": "Terrace Price",
      "dash.th.allerg": "Allergens",
      "dash.th.stock": "Stock",
      "dash.th.act": "Actions",
      "dash.promo.p1.title": "Empanadas + Malbec",
      "dash.promo.p1.desc": "3 creole empanadas + glass of Malbec for 9€. Mon–Thu 6 to 8 pm.",
      "dash.promo.p2.title": "Provoleta + Vermouth",
      "dash.promo.p2.desc": "Grilled provoleta + draft vermouth for 12€ all Saturday long.",
      "dash.promo.edit": "Edit",
      "dash.promo.new": "New promotion",
      "dash.hours.title": "Madrid double shift",
      "dash.hours.sub": "Tune kitchen and bar · lunch and dinner",
      "dash.hours.save": "Save hours",
      "dash.ch.connected": "Connected",
      "dash.ch.number": "Active number",
      "dash.ch.greeting": "Auto-reply",
      "dash.ch.greetingVal": "Hi! I'm Beto. Booking, takeaway or slate question?",
      "dash.ch.save": "Save channel",
      "dash.ch.test": "Test link",
      "dash.ch.handle": "Handle",
      "dash.ch.url": "Public URL",
      "dash.ch.open": "Open profile",
      "dash.ch.email": "Email for booking notifications",
      "dash.ch.calendar": "Calendar invited on every booking",
      "dash.ch.emailNote": "Web bookings send: an email to this inbox via FormSubmit, a Google Calendar invite as attendee, and a WhatsApp summary with chat transcript. First time an email arrives, open the inbox and click the FormSubmit activation link.",
      "dash.ch.openCal": "Open Google Calendar",

      "cat.share": "To Share",
      "cat.tapas": "Our Tapas",
      "cat.bodega": "Cellar",
      "cat.spirits": "Spirits",
      "toast.langSwitched": "Language switched to English",
      "toast.roleSwitched": "Active role:",
      "toast.viewSwitched": "View:",
      "toast.priceSaved": "Price updated",
      "toast.stockToggled": "Stock updated",
      "toast.allergenToggled": "Allergen updated",
      "toast.deleted": "Dish removed",
      "toast.added": "Dish added to the slate",
      "toast.savedHours": "Hours saved",
      "toast.savedPromo": "Promotion saved",
      "toast.noPerm": "Action not allowed for this role",

      "reserveCta.eyebrow": "Book your table",
      "reserveCta.title": "Lock in your seat at the slate",
      "reserveCta.lead": "Book in 20 seconds. We confirm via WhatsApp and add it to your calendar.",
      "reserveCta.btn": "Book now",
      "reserveCta.small": "Instant confirmation · No card required",

      "reserve.eyebrow": "Express booking",
      "reserve.title": "Your table at Capitán Beto",
      "reserve.lead": "Fill in 20 seconds. We'll WhatsApp you a confirmation and a Google Calendar link.",
      "reserve.f.name": "Name",
      "reserve.f.phone": "Phone (WhatsApp)",
      "reserve.f.email": "Email (optional)",
      "reserve.email": "Confirm by email",
      "toast.emailSent": "Booking emailed to the bar ✉️",
      "toast.emailFallback": "Opening your email client...",
      "reserve.f.date": "Date",
      "reserve.f.time": "Time",
      "reserve.f.people": "Guests",
      "reserve.f.where": "Where?",
      "reserve.f.terraza": "Terrace · pet-friendly",
      "reserve.f.barra": "Bar",
      "reserve.f.comedor": "Dining room",
      "reserve.f.notes": "Notes (allergies, occasion...)",
      "reserve.next": "Review booking",
      "reserve.back": "Back",
      "reserve.send": "Send via WhatsApp",
      "reserve.cal": "Add to Google Calendar",
      "reserve.foot": "We reply in under 10 minutes. You can also chat directly with a real waiter.",

      "chat.headerName": "Beto · Assistant",
      "chat.headerStatus": "Online · replies instantly",
      "chat.humanPill": "Human",
      "chat.input": "Type your question...",
      "chat.welcome": "Hi! I'm Beto, the taberna's assistant 🍷 Castizo tapas with an Argentine twist. How can I help? If at any time you'd rather talk to a real person, tap «Human» above.",
      "chat.handover.title": "Connecting you to a waiter",
      "chat.handover.subtitle": "We reply on WhatsApp in <10 min",
      "chat.handover.body": "We're sending this chat context to the team so you don't have to repeat yourself.",
      "chat.handover.cta": "Open WhatsApp",
      "chat.handover.foot": "WhatsApp Business · +34 611 854 380",
      "chat.handover.systemNote": "Summary sent to the waiter on WhatsApp",
      "chat.escalateAuto": "I don't want to waste your time. Let me connect you to a real waiter who'll help better 👇",
      "wa.transcript.header": "— Summary of conversation with Beto (web chatbot) —",
      "wa.transcript.you": "Customer",
      "wa.transcript.bot": "Beto (bot)",
      "chat.q.reserve": "I'd like to book",
      "chat.q.hours": "Hours",
      "chat.q.location": "Where are you?",
      "chat.q.pet": "Do you allow pets?",
      "chat.q.menu": "What's on tonight?",
      "chat.q.allergens": "Allergens",
      "chat.q.human": "Talk to a person",
      "chat.a.hours": "Madrid double-shift kitchen: 1–4:30 pm (lunch) and 8–11:30 pm (dinner). Weekends we run till 1:30 am. Want to book?",
      "chat.a.location": "We're at Calle de los Hidalgos, Madrid. Closest metro is La Latina, 4-min walk. Want a Google Maps pin?",
      "chat.a.pet": "Of course! We're 100% pet-friendly: all animals welcome throughout the whole bar. Water bowls in every area, salt-free/sugar-free homemade snacks baked by la Polaca, quiet shaded corners. Dogs, cats, rabbits, ferrets, birds... if it comes with you, it comes with us. Want to book a table?",
      "chat.a.menu": "Tonight on the slate: grilled provoleta, creole empanadas, milanesa napolitana, choripán and draft vermouth. Changes weekly. Want the full slate?",
      "chat.a.allergens": "We flag gluten, dairy, egg, fish, mollusks, sulphites and nuts on every dish. Tell me your allergy and I'll recommend.",
      "chat.a.human": "Connecting you to a real waiter on WhatsApp right now (+34 611 854 380) 👇",
      "chat.a.reserveStart": "Let's book that table! I'll open the quick form (20 seconds) or you can tell me here.",
      "chat.cta.openForm": "Open booking form",
      "chat.cta.contWa": "Continue on WhatsApp",
      "chat.cta.maps": "Open Google Maps",
      "chat.cta.menu": "View the Slate",
      "chat.unknown": "Hmm, not sure about that. Want me to put you through to a real waiter?",
      "chat.human.intro": "I'll connect you with the Capitán Beto team on WhatsApp. Your question:",
      "chat.confirm.wa": "Done. WhatsApp is opening with your booking summary. If it didn't, you can copy the link.",

      "wa.bot.summary": "Hi, I'm {{name}}. I'd like to book a table at Capitán Beto:",
      "wa.bot.human": "Hi Capitán Beto, I'm coming from the website chat and need to talk to a person. My question:"
    }
  };

  // ---------- Data ----------
  // ============================================================
  // MENÚ REAL DEL BAR — fuente: cartas físicas Capitán Beto
  // Precios en EUR · `terr` = precio terraza (mismo si no aplica)
  // ============================================================
  const DISHES = [
    // ============ TAPAS · platos individuales ============
    { id: "t1", cat: "tapas", title: { es: "Croquetas (4 unidades)", en: "Croquettes (4 pcs)" }, desc: { es: "Caseras, cremosas por dentro, doradas por fuera.", en: "Homemade, creamy inside, golden crust." }, base: 6.00, terr: 6.00, allergens: ["gluten", "lacteos", "huevo"], stock: true },
    { id: "t2", cat: "tapas", title: { es: "Gildas (4 unidades)", en: "Gildas (4 pcs)" }, desc: { es: "Anchoa, piparra y aceituna. La tapa clásica del norte.", en: "Anchovy, piparra pepper and olive. The classic northern bite." }, base: 6.00, terr: 6.00, allergens: ["pescado", "sulfitos"], stock: true },
    { id: "t3", cat: "tapas", title: { es: "Empanada Argentina (unidad)", en: "Argentine Empanada (each)" }, desc: { es: "Carne suave o espinaca y queso. Hechas a mano.", en: "Soft beef or spinach with cheese. Hand-folded." }, base: 4.00, terr: 4.00, allergens: ["gluten", "lacteos", "huevo"], stock: true },
    { id: "t4", cat: "tapas", title: { es: "Pincho de tortilla española", en: "Spanish Omelette Slice" }, desc: { es: "Bien hecha, jugosa por dentro.", en: "Properly cooked, juicy inside." }, base: 6.00, terr: 6.00, allergens: ["huevo"], stock: true },
    { id: "t5", cat: "tapas", title: { es: "Milanesa de pollo", en: "Chicken Milanesa" }, desc: { es: "Empanada fina, dorada en sartén. Acompañada.", en: "Thin breaded chicken, pan-fried golden." }, base: 8.00, terr: 8.00, allergens: ["gluten", "lacteos", "huevo"], stock: true },
    { id: "t6", cat: "tapas", title: { es: "Patatas bravas / alioli", en: "Patatas Bravas / Aioli" }, desc: { es: "Doble fritura, salsa brava propia. Con o sin alioli.", en: "Double-fried, our house brava sauce. With or without aioli." }, base: 6.00, terr: 6.00, allergens: ["huevo", "lacteos"], stock: true },
    { id: "t7", cat: "tapas", title: { es: "Bocata de jamón ibérico", en: "Iberian Ham Sandwich" }, desc: { es: "Pan crujiente con jamón ibérico de corte fino.", en: "Crusty bread with thin-sliced Iberian ham." }, base: 7.00, terr: 7.00, allergens: ["gluten"], stock: true },
    { id: "t8", cat: "tapas", title: { es: "Tequeños de queso (6 unidades)", en: "Cheese Tequeños (6 pcs)" }, desc: { es: "Bastones venezolanos de queso fundido, masa crujiente.", en: "Venezuelan cheese sticks, crunchy dough." }, base: 9.50, terr: 9.50, allergens: ["gluten", "lacteos"], stock: true },
    { id: "t9", cat: "tapas", title: { es: "Ensaladilla Rusa", en: "Russian Salad" }, desc: { es: "Receta de la casa, generosa y bien fría.", en: "House recipe, generous and well chilled." }, base: 10.00, terr: 10.00, allergens: ["huevo", "pescado"], stock: true },

    // ============ EXTRAS ============
    { id: "tx1", cat: "tapas", title: { es: "Pan", en: "Bread" }, desc: { es: "Pan de panadería madrileña.", en: "Madrid bakery bread." }, base: 1.50, terr: 1.50, allergens: ["gluten"], stock: true },
    { id: "tx2", cat: "tapas", title: { es: "Olivas", en: "Olives" }, desc: { es: "Marinadas en casa.", en: "Home-marinated." }, base: 3.00, terr: 3.00, allergens: [], stock: true },

    // ============ POSTRES ============
    { id: "tx3", cat: "tapas", title: { es: "Postres del día", en: "Daily desserts" }, desc: { es: "Consultar con el camarero.", en: "Ask your server." }, base: 0, terr: 0, allergens: ["lacteos", "gluten", "huevo"], stock: true },

    // ============ RACIONES · share ============
    { id: "r1", cat: "share", title: { es: "Patatas bravas / alioli (ración)", en: "Patatas Bravas / Aioli (full)" }, desc: { es: "Versión grande para compartir.", en: "Full-size to share." }, base: 8.00, terr: 8.00, allergens: ["huevo", "lacteos"], stock: true },
    { id: "r2", cat: "share", title: { es: "Croquetas (8 unidades)", en: "Croquettes (8 pcs)" }, desc: { es: "Bandeja grande de croquetas caseras.", en: "Big tray of homemade croquettes." }, base: 10.00, terr: 10.00, allergens: ["gluten", "lacteos", "huevo"], stock: true },
    { id: "r3", cat: "share", title: { es: "Tortilla española dorada (incluye pan)", en: "Golden Spanish Omelette (incl. bread)" }, desc: { es: "Bien hecha, dorada. Para mesa.", en: "Properly cooked, golden. Table-share." }, base: 12.00, terr: 12.00, allergens: ["huevo", "gluten"], stock: true },
    { id: "r4", cat: "share", title: { es: "Milanesa de pollo (ración)", en: "Chicken Milanesa (full)" }, desc: { es: "Ración grande, ideal para compartir.", en: "Big plate, ideal to share." }, base: 15.00, terr: 15.00, allergens: ["gluten", "lacteos", "huevo"], stock: true },
    { id: "r5", cat: "share", title: { es: "Pizza · margarita / 4 quesos / jamón serrano", en: "Pizza · margarita / 4 cheese / serrano" }, desc: { es: "Fines de semana solo por la noche.", en: "Weekends evenings only." }, base: 13.00, terr: 13.00, allergens: ["gluten", "lacteos"], stock: true },
    { id: "r6", cat: "share", title: { es: "Ración de queso manchego", en: "Manchego Cheese Plate" }, desc: { es: "Selección de cortes y curaciones.", en: "Selection of cuts and aging." }, base: 15.00, terr: 15.00, allergens: ["lacteos"], stock: true },
    { id: "r7", cat: "share", title: { es: "Ración de jamón ibérico", en: "Iberian Ham Plate" }, desc: { es: "Corte fino, plato completo.", en: "Thinly sliced, full plate." }, base: 21.00, terr: 21.00, allergens: [], stock: true },

    // ============ PICADA DEL CAPITÁN ============
    { id: "p1", cat: "share", title: { es: "Picada del Capitán (2 personas)", en: "Captain's Board (for 2)" }, desc: { es: "Jamón ibérico y serrano, queso manchego, croquetas, gildas, milanesa de pollo, empanadas argentinas, cherry, olivas y pan.", en: "Iberian and serrano ham, Manchego, croquettes, gildas, chicken milanesa, Argentine empanadas, cherry tomatoes, olives and bread." }, base: 45.00, terr: 45.00, allergens: ["gluten", "lacteos", "huevo", "pescado", "sulfitos"], stock: true },
    { id: "p2", cat: "share", title: { es: "Picada del Capitán (4 personas)", en: "Captain's Board (for 4)" }, desc: { es: "La picada grande para compartir entre cuatro. Misma selección, doble cantidad.", en: "Big board for four. Same selection, double size." }, base: 60.00, terr: 60.00, allergens: ["gluten", "lacteos", "huevo", "pescado", "sulfitos"], stock: true },

    // ============ CERVEZAS ============
    { id: "b1", cat: "bodega", title: { es: "Cañita (25 cl)", en: "Small draft (25 cl)" }, desc: { es: "Tirada en grifo.", en: "Draft." }, base: 2.50, terr: 2.50, allergens: ["gluten"], stock: true },
    { id: "b2", cat: "bodega", title: { es: "Doble (33 cl)", en: "Double draft (33 cl)" }, desc: { es: "Tirada en grifo.", en: "Draft." }, base: 3.30, terr: 3.30, allergens: ["gluten"], stock: true },
    { id: "b3", cat: "bodega", title: { es: "Jarra de cerveza (50 cl)", en: "Pitcher (50 cl)" }, desc: { es: "Tirada en grifo.", en: "Draft." }, base: 5.00, terr: 5.00, allergens: ["gluten"], stock: true },
    { id: "b4", cat: "bodega", title: { es: "Tercio · Mahou / Estrella Galicia / Alhambra", en: "Bottle · Mahou / Estrella / Alhambra" }, desc: { es: "Tercio de cerveza embotellada.", en: "Bottled beer." }, base: 3.80, terr: 3.80, allergens: ["gluten"], stock: true },
    { id: "b5", cat: "bodega", title: { es: "Mahou Tostada 0,0", en: "Mahou Toasted 0.0" }, desc: { es: "Cerveza sin alcohol, tono tostado.", en: "Alcohol-free, toasted profile." }, base: 3.80, terr: 3.80, allergens: ["gluten"], stock: true },
    { id: "b6", cat: "bodega", title: { es: "Mahou sin Gluten", en: "Mahou Gluten-Free" }, desc: { es: "Apta para celíacos.", en: "Gluten-free, celiac-friendly." }, base: 3.80, terr: 3.80, allergens: [], stock: true },

    // ============ VINOS TINTOS ============
    { id: "v1", cat: "bodega", title: { es: "Ribera del Duero · copa", en: "Ribera del Duero · glass" }, desc: { es: "Tinto castellano, cuerpo medio.", en: "Castilian red, medium body." }, base: 3.60, terr: 3.60, allergens: ["sulfitos"], stock: true },
    { id: "v2", cat: "bodega", title: { es: "Ribera del Duero · botella", en: "Ribera del Duero · bottle" }, desc: { es: "Para mesa.", en: "Table bottle." }, base: 17.00, terr: 17.00, allergens: ["sulfitos"], stock: true },
    { id: "v3", cat: "bodega", title: { es: "Rioja · copa", en: "Rioja · glass" }, desc: { es: "Tempranillo riojano.", en: "Rioja Tempranillo." }, base: 4.75, terr: 4.75, allergens: ["sulfitos"], stock: true },
    { id: "v4", cat: "bodega", title: { es: "Rioja · botella", en: "Rioja · bottle" }, desc: { es: "Para mesa.", en: "Table bottle." }, base: 22.00, terr: 22.00, allergens: ["sulfitos"], stock: true },
    { id: "v5", cat: "bodega", title: { es: "Malbec Argentino · copa", en: "Argentine Malbec · glass" }, desc: { es: "Mendocino, frutado y redondo.", en: "Mendoza Malbec, fruity and round." }, base: 4.00, terr: 4.00, allergens: ["sulfitos"], stock: true },
    { id: "v6", cat: "bodega", title: { es: "Malbec Argentino · botella", en: "Argentine Malbec · bottle" }, desc: { es: "Para mesa.", en: "Table bottle." }, base: 19.00, terr: 19.00, allergens: ["sulfitos"], stock: true },
    { id: "v7", cat: "bodega", title: { es: "Vino de Madrid · copa", en: "Madrid wine · glass" }, desc: { es: "Tinto de la tierra.", en: "Local Madrid red." }, base: 3.80, terr: 3.80, allergens: ["sulfitos"], stock: true },
    { id: "v8", cat: "bodega", title: { es: "Vino de Madrid · botella", en: "Madrid wine · bottle" }, desc: { es: "Para mesa.", en: "Table bottle." }, base: 17.00, terr: 17.00, allergens: ["sulfitos"], stock: true },

    // ============ VINOS BLANCOS ============
    { id: "vb1", cat: "bodega", title: { es: "Albariño · copa", en: "Albariño · glass" }, desc: { es: "Blanco gallego, fresco y aromático.", en: "Galician white, fresh and aromatic." }, base: 3.80, terr: 3.80, allergens: ["sulfitos"], stock: true },
    { id: "vb2", cat: "bodega", title: { es: "Albariño · botella", en: "Albariño · bottle" }, desc: { es: "Para mesa.", en: "Table bottle." }, base: 18.00, terr: 18.00, allergens: ["sulfitos"], stock: true },
    { id: "vb3", cat: "bodega", title: { es: "Verdejo · copa", en: "Verdejo · glass" }, desc: { es: "Blanco castellano de Rueda.", en: "Castilian white from Rueda." }, base: 3.60, terr: 3.60, allergens: ["sulfitos"], stock: true },
    { id: "vb4", cat: "bodega", title: { es: "Verdejo · botella", en: "Verdejo · bottle" }, desc: { es: "Para mesa.", en: "Table bottle." }, base: 17.00, terr: 17.00, allergens: ["sulfitos"], stock: true },
    { id: "vb5", cat: "bodega", title: { es: "Blanco dulce · copa", en: "Sweet white · glass" }, desc: { es: "Para postres o acompañar quesos.", en: "Pairs with dessert or cheese." }, base: 3.30, terr: 3.30, allergens: ["sulfitos"], stock: true },
    { id: "vb6", cat: "bodega", title: { es: "Blanco dulce · botella", en: "Sweet white · bottle" }, desc: { es: "Para mesa.", en: "Table bottle." }, base: 15.00, terr: 15.00, allergens: ["sulfitos"], stock: true },
    { id: "vr1", cat: "bodega", title: { es: "Rosado · copa", en: "Rosé · glass" }, desc: { es: "Suave y fresco.", en: "Smooth and fresh." }, base: 4.20, terr: 4.20, allergens: ["sulfitos"], stock: true },
    { id: "vr2", cat: "bodega", title: { es: "Rosado · botella", en: "Rosé · bottle" }, desc: { es: "Para mesa.", en: "Table bottle." }, base: 20.00, terr: 20.00, allergens: ["sulfitos"], stock: true },

    // ============ CAVA · VERMUT · TINTO DE VERANO ============
    { id: "c1", cat: "bodega", title: { es: "Cava Anna de Codorníu · botella", en: "Cava Anna de Codorníu · bottle" }, desc: { es: "Brut catalán, burbuja fina.", en: "Catalan brut, fine bubble." }, base: 25.00, terr: 25.00, allergens: ["sulfitos"], stock: true },
    { id: "vm1", cat: "bodega", title: { es: "Vermut de grifo", en: "Draft Vermouth" }, desc: { es: "Servido en copa con hielo, naranja y aceituna.", en: "Glass, ice, orange slice and olive." }, base: 3.50, terr: 3.50, allergens: ["sulfitos"], stock: true },
    { id: "tv1", cat: "bodega", title: { es: "Tinto de verano · copa", en: "Summer red wine · glass" }, desc: { es: "Tinto con gaseosa, bien frío.", en: "Red wine with soda, well chilled." }, base: 3.50, terr: 3.50, allergens: ["sulfitos"], stock: true },
    { id: "tv2", cat: "bodega", title: { es: "Tinto de verano · jarra", en: "Summer red wine · pitcher" }, desc: { es: "Jarra para compartir.", en: "Pitcher to share." }, base: 15.00, terr: 15.00, allergens: ["sulfitos"], stock: true },

    // ============ REFRESCOS ============
    { id: "rf1", cat: "bodega", title: { es: "Coca-Cola / Coca-Cola Zero", en: "Coca-Cola / Zero" }, desc: { es: "Lata o vaso.", en: "Can or glass." }, base: 3.00, terr: 3.00, allergens: [], stock: true },
    { id: "rf2", cat: "bodega", title: { es: "Sprite", en: "Sprite" }, desc: { es: "Lata o vaso.", en: "Can or glass." }, base: 3.00, terr: 3.00, allergens: [], stock: true },
    { id: "rf3", cat: "bodega", title: { es: "Fanta", en: "Fanta" }, desc: { es: "Lata o vaso.", en: "Can or glass." }, base: 3.00, terr: 3.00, allergens: [], stock: true },
    { id: "rf4", cat: "bodega", title: { es: "Tónica Schweppes", en: "Schweppes Tonic" }, desc: { es: "Lata o vaso.", en: "Can or glass." }, base: 3.00, terr: 3.00, allergens: [], stock: true },
    { id: "rf5", cat: "bodega", title: { es: "Nestea", en: "Nestea" }, desc: { es: "Té frío al limón.", en: "Cold lemon tea." }, base: 3.00, terr: 3.00, allergens: [], stock: true },
    { id: "rf6", cat: "bodega", title: { es: "Aquarius", en: "Aquarius" }, desc: { es: "Limón o naranja.", en: "Lemon or orange." }, base: 3.00, terr: 3.00, allergens: [], stock: true },
    { id: "rf7", cat: "bodega", title: { es: "Mosto", en: "Mosto (grape juice)" }, desc: { es: "Sin alcohol.", en: "Non-alcoholic." }, base: 2.50, terr: 2.50, allergens: ["sulfitos"], stock: true },
    { id: "rf8", cat: "bodega", title: { es: "Zumos", en: "Juices" }, desc: { es: "Consultá los del día.", en: "Ask for today's selection." }, base: 2.50, terr: 2.50, allergens: [], stock: true },
    { id: "rf9", cat: "bodega", title: { es: "Agua", en: "Still water" }, desc: { es: "Botella.", en: "Bottle." }, base: 2.80, terr: 2.80, allergens: [], stock: true },
    { id: "rf10", cat: "bodega", title: { es: "Agua con gas", en: "Sparkling water" }, desc: { es: "Botella.", en: "Bottle." }, base: 2.80, terr: 2.80, allergens: [], stock: true },

    // ============ CÓCTELES Y COMBINADOS ============
    { id: "co1", cat: "spirits", title: { es: "Dry Martini", en: "Dry Martini" }, desc: { es: "Ginebra y vermut seco. Clásico.", en: "Gin and dry vermouth. Classic." }, base: 8.00, terr: 8.00, allergens: ["sulfitos"], stock: true },
    { id: "co2", cat: "spirits", title: { es: "Aperol Spritz", en: "Aperol Spritz" }, desc: { es: "Aperol, cava y agua con gas.", en: "Aperol, cava and sparkling water." }, base: 8.00, terr: 8.00, allergens: ["sulfitos"], stock: true },
    { id: "co3", cat: "spirits", title: { es: "Campari Spritz", en: "Campari Spritz" }, desc: { es: "Campari, cava y agua con gas.", en: "Campari, cava and sparkling water." }, base: 8.00, terr: 8.00, allergens: ["sulfitos"], stock: true },
    { id: "co4", cat: "spirits", title: { es: "Fernet con Coca-Cola", en: "Fernet & Coke" }, desc: { es: "Fernet Branca y Coca Cola. El trago argentino.", en: "Fernet Branca and Coke. The Argentine classic." }, base: 8.00, terr: 8.00, allergens: [], stock: true },
    { id: "co5", cat: "spirits", title: { es: "Ferroviario", en: "Ferroviario" }, desc: { es: "Fernet Branca, vermut rojo y agua con gas.", en: "Fernet Branca, red vermouth, sparkling water." }, base: 8.00, terr: 8.00, allergens: ["sulfitos"], stock: true },
    { id: "co6", cat: "spirits", title: { es: "Mojito", en: "Mojito" }, desc: { es: "Ron Bacardi blanco, azúcar, hierbabuena, lima, agua con gas.", en: "Bacardí white rum, sugar, mint, lime, sparkling water." }, base: 8.00, terr: 8.00, allergens: [], stock: true },
    { id: "co7", cat: "spirits", title: { es: "Negroni", en: "Negroni" }, desc: { es: "Ginebra, vermut rojo, Campari.", en: "Gin, red vermouth, Campari." }, base: 8.00, terr: 8.00, allergens: ["sulfitos"], stock: true },
    { id: "co8", cat: "spirits", title: { es: "Milano Torino", en: "Milano-Torino" }, desc: { es: "Vermut rojo y Campari.", en: "Red vermouth and Campari." }, base: 8.00, terr: 8.00, allergens: ["sulfitos"], stock: true },
    { id: "co9", cat: "spirits", title: { es: "Calimocho", en: "Kalimotxo" }, desc: { es: "Vino tinto y Coca-Cola.", en: "Red wine and Coke." }, base: 6.50, terr: 6.50, allergens: ["sulfitos"], stock: true },
    { id: "co10", cat: "spirits", title: { es: "Whiscola", en: "Whisky & Coke" }, desc: { es: "Ballantine's, Dewar's, J&B, Jim Beam o Wild Turkey 101 con Coca Cola.", en: "Ballantine's, Dewar's, J&B, Jim Beam or Wild Turkey 101 with Coke." }, base: 10.00, terr: 10.00, allergens: [], stock: true },
    { id: "co11", cat: "spirits", title: { es: "Roncola", en: "Rum & Coke" }, desc: { es: "Santa Teresa o Brugal con Coca Cola.", en: "Santa Teresa or Brugal with Coke." }, base: 10.00, terr: 10.00, allergens: [], stock: true },
    { id: "co12", cat: "spirits", title: { es: "Gin Tonic", en: "Gin & Tonic" }, desc: { es: "Beefeater, Seagram's, Tanqueray, Puerto de Indias o Bombay con tónica Schweppes.", en: "Beefeater, Seagram's, Tanqueray, Puerto de Indias or Bombay with Schweppes tonic." }, base: 10.00, terr: 10.00, allergens: ["sulfitos"], stock: true },

    // ============ WHISKY (7,5 cl) ============
    { id: "w1", cat: "spirits", title: { es: "Toki Suntory · Japonés", en: "Toki Suntory · Japanese" }, desc: { es: "7,5 cl. Maltas mezcladas, perfil suave.", en: "7.5 cl. Blended malts, smooth profile." }, base: 12.00, terr: 12.00, allergens: ["gluten"], stock: true },
    { id: "w2", cat: "spirits", title: { es: "Johnnie Walker Black Label · Escocés", en: "Johnnie Walker Black · Scotch" }, desc: { es: "7,5 cl. 12 años de mezcla.", en: "7.5 cl. 12-year blend." }, base: 11.00, terr: 11.00, allergens: ["gluten"], stock: true },
    { id: "w3", cat: "spirits", title: { es: "Jack Daniel's · EEUU", en: "Jack Daniel's · USA" }, desc: { es: "7,5 cl. Tennessee whiskey.", en: "7.5 cl. Tennessee whiskey." }, base: 10.00, terr: 10.00, allergens: ["gluten"], stock: true },
    { id: "w4", cat: "spirits", title: { es: "Bushmills · Irlandés", en: "Bushmills · Irish" }, desc: { es: "7,5 cl. Triple destilado.", en: "7.5 cl. Triple distilled." }, base: 10.00, terr: 10.00, allergens: ["gluten"], stock: true },
    { id: "w5", cat: "spirits", title: { es: "Ballantine's · Escocés", en: "Ballantine's · Scotch" }, desc: { es: "7,5 cl. Blend escocés clásico.", en: "7.5 cl. Classic Scotch blend." }, base: 8.00, terr: 8.00, allergens: ["gluten"], stock: true },
    { id: "w6", cat: "spirits", title: { es: "Dewar's · Escocés", en: "Dewar's · Scotch" }, desc: { es: "7,5 cl. Blend escocés.", en: "7.5 cl. Scotch blend." }, base: 8.00, terr: 8.00, allergens: ["gluten"], stock: true },
    { id: "w7", cat: "spirits", title: { es: "J&B · Escocés", en: "J&B · Scotch" }, desc: { es: "7,5 cl.", en: "7.5 cl." }, base: 8.00, terr: 8.00, allergens: ["gluten"], stock: true },
    { id: "w8", cat: "spirits", title: { es: "Jim Beam · EEUU", en: "Jim Beam · USA" }, desc: { es: "7,5 cl. Bourbon de Kentucky.", en: "7.5 cl. Kentucky bourbon." }, base: 8.00, terr: 8.00, allergens: ["gluten"], stock: true },
    { id: "w9", cat: "spirits", title: { es: "Wild Turkey 101 · EEUU", en: "Wild Turkey 101 · USA" }, desc: { es: "7,5 cl. Bourbon de alta graduación.", en: "7.5 cl. High-proof bourbon." }, base: 8.00, terr: 8.00, allergens: ["gluten"], stock: true },

    // ============ RON (7,5 cl) ============
    { id: "ro1", cat: "spirits", title: { es: "Barceló", en: "Barceló" }, desc: { es: "7,5 cl. Ron dominicano añejo.", en: "7.5 cl. Dominican aged rum." }, base: 10.00, terr: 10.00, allergens: [], stock: true },
    { id: "ro2", cat: "spirits", title: { es: "Santa Teresa", en: "Santa Teresa" }, desc: { es: "7,5 cl. Ron venezolano.", en: "7.5 cl. Venezuelan rum." }, base: 8.00, terr: 8.00, allergens: [], stock: true },
    { id: "ro3", cat: "spirits", title: { es: "Legendario", en: "Legendario" }, desc: { es: "7,5 cl. Ron cubano.", en: "7.5 cl. Cuban rum." }, base: 8.00, terr: 8.00, allergens: [], stock: true },
    { id: "ro4", cat: "spirits", title: { es: "Brugal", en: "Brugal" }, desc: { es: "7,5 cl. Ron dominicano.", en: "7.5 cl. Dominican rum." }, base: 8.00, terr: 8.00, allergens: [], stock: true },
    { id: "ro5", cat: "spirits", title: { es: "Bacardí", en: "Bacardí" }, desc: { es: "7,5 cl. Ron blanco clásico.", en: "7.5 cl. Classic white rum." }, base: 8.00, terr: 8.00, allergens: [], stock: true },

    // ============ GIN (7,5 cl) ============
    { id: "gi1", cat: "spirits", title: { es: "Martin Miller's", en: "Martin Miller's" }, desc: { es: "7,5 cl. Gin inglés premium.", en: "7.5 cl. Premium English gin." }, base: 10.00, terr: 10.00, allergens: [], stock: true },
    { id: "gi2", cat: "spirits", title: { es: "Beefeater", en: "Beefeater" }, desc: { es: "7,5 cl. London Dry clásico.", en: "7.5 cl. Classic London Dry." }, base: 8.00, terr: 8.00, allergens: [], stock: true },
    { id: "gi3", cat: "spirits", title: { es: "Seagram's", en: "Seagram's" }, desc: { es: "7,5 cl.", en: "7.5 cl." }, base: 8.00, terr: 8.00, allergens: [], stock: true },
    { id: "gi4", cat: "spirits", title: { es: "Tanqueray", en: "Tanqueray" }, desc: { es: "7,5 cl. London Dry premium.", en: "7.5 cl. Premium London Dry." }, base: 8.00, terr: 8.00, allergens: [], stock: true },
    { id: "gi5", cat: "spirits", title: { es: "Puerto de Indias", en: "Puerto de Indias" }, desc: { es: "7,5 cl. Gin sevillano.", en: "7.5 cl. Seville gin." }, base: 8.00, terr: 8.00, allergens: [], stock: true },
    { id: "gi6", cat: "spirits", title: { es: "Bombay", en: "Bombay" }, desc: { es: "7,5 cl. Bombay Sapphire.", en: "7.5 cl. Bombay Sapphire." }, base: 8.00, terr: 8.00, allergens: [], stock: true },

    // ============ TEQUILA ============
    { id: "te1", cat: "spirits", title: { es: "Don Julio (7,5 cl)", en: "Don Julio (7.5 cl)" }, desc: { es: "Tequila premium 100% agave.", en: "Premium 100% agave tequila." }, base: 10.00, terr: 10.00, allergens: [], stock: true },
    { id: "te2", cat: "spirits", title: { es: "Don Julio · chupito (3 cl)", en: "Don Julio · shot (3 cl)" }, desc: { es: "Shot 3 cl.", en: "3 cl shot." }, base: 4.50, terr: 4.50, allergens: [], stock: true },
    { id: "te3", cat: "spirits", title: { es: "José Cuervo (7,5 cl)", en: "José Cuervo (7.5 cl)" }, desc: { es: "Tequila mexicano.", en: "Mexican tequila." }, base: 8.00, terr: 8.00, allergens: [], stock: true },
    { id: "te4", cat: "spirits", title: { es: "José Cuervo · chupito (3 cl)", en: "José Cuervo · shot (3 cl)" }, desc: { es: "Shot 3 cl.", en: "3 cl shot." }, base: 3.00, terr: 3.00, allergens: [], stock: true },

    // ============ LICORES ============
    { id: "li1", cat: "spirits", title: { es: "Crema de Orujo (7,5 cl)", en: "Crema de Orujo (7.5 cl)" }, desc: { es: "Crema gallega digestiva.", en: "Galician cream liqueur." }, base: 3.00, terr: 3.00, allergens: ["lacteos"], stock: true },
    { id: "li2", cat: "spirits", title: { es: "Pacharán (7,5 cl)", en: "Pacharán (7.5 cl)" }, desc: { es: "Licor navarro de endrinas.", en: "Navarre sloe liqueur." }, base: 3.00, terr: 3.00, allergens: [], stock: true },
    { id: "li3", cat: "spirits", title: { es: "Licor de Hierbas (7,5 cl)", en: "Herb Liqueur (7.5 cl)" }, desc: { es: "Hierbas clásicas para sobremesa.", en: "Classic herbal digestif." }, base: 3.00, terr: 3.00, allergens: [], stock: true }
  ];

  const HOURS = [
    { day: "lun", open: true, lunch: ["13:00", "16:30"], dinner: ["20:00", "23:30"] },
    { day: "mar", open: true, lunch: ["13:00", "16:30"], dinner: ["20:00", "23:30"] },
    { day: "mie", open: true, lunch: ["13:00", "16:30"], dinner: ["20:00", "23:30"] },
    { day: "jue", open: true, lunch: ["13:00", "16:30"], dinner: ["20:00", "00:30"] },
    { day: "vie", open: true, lunch: ["13:00", "17:00"], dinner: ["20:00", "01:30"] },
    { day: "sab", open: true, lunch: ["12:30", "17:00"], dinner: ["20:00", "01:30"] },
    { day: "dom", open: true, lunch: ["12:30", "17:30"], dinner: [null, null] }
  ];

  const DAY_NAMES = {
    es: { lun: "Lunes", mar: "Martes", mie: "Miércoles", jue: "Jueves", vie: "Viernes", sab: "Sábado", dom: "Domingo" },
    en: { lun: "Monday", mar: "Tuesday", mie: "Wednesday", jue: "Thursday", vie: "Friday", sab: "Saturday", dom: "Sunday" }
  };

  const ALLERGEN_LABELS = {
    es: { gluten: "Gluten", lacteos: "Lácteos", huevo: "Huevo", pescado: "Pescado", moluscos: "Moluscos", sulfitos: "Sulfitos", frutos_secos: "Frutos secos", soja: "Soja" },
    en: { gluten: "Gluten", lacteos: "Dairy", huevo: "Egg", pescado: "Fish", moluscos: "Mollusks", sulfitos: "Sulphites", frutos_secos: "Nuts", soja: "Soy" }
  };
  const ALLERGEN_KEYS = ["gluten", "lacteos", "huevo", "pescado", "moluscos", "sulfitos", "frutos_secos", "soja"];

  // ---------- State ----------
  const state = {
    lang: "es",
    role: "admin",
    view: "public",
    menuTab: "share",
    dashTab: "inventory",
    invFilter: ""
  };

  // ---------- Helpers ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const t = (key) => I18N[state.lang][key] ?? key;
  const fmtPrice = (n) => {
    if (state.lang === "es") return n.toFixed(2).replace(".", ",") + " €";
    return "€" + n.toFixed(2);
  };

  function toast(message) {
    const el = $("#toast");
    el.textContent = message;
    el.classList.add("is-show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove("is-show"), 2200);
  }

  // ---------- i18n ----------
  function applyI18n() {
    $$("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val = I18N[state.lang][key];
      if (val == null) return;
      // I18N strings vienen del developer, NO de user input — son confiables.
      // Igual sanitizamos por defensa en profundidad (defense in depth).
      if (/<[a-z]/i.test(val)) el.innerHTML = sanitizeAdminHTML(val);
      else el.textContent = val;
    });
    $$("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      const val = I18N[state.lang][key];
      if (val != null) el.setAttribute("placeholder", val);
    });
    document.documentElement.setAttribute("lang", state.lang);
  }

  // ---------- Render: public menu ----------
  function renderPublicMenu(animateSwap = false) {
    const grid = $("#publicMenuGrid");
    if (!grid) return;

    const cards = DISHES.filter((d) => d.cat === state.menuTab).map((d) => {
      const allergens = d.allergens.map((a) =>
        `<span class="tag">${ALLERGEN_LABELS[state.lang][a] || a}</span>`
      ).join("");
      const stockTag = d.stock
        ? ""
        : `<span class="tag tag--stock-out">${state.lang === "es" ? "Sin stock" : "Out of stock"}</span>`;
      return `
        <article class="dish-card">
          <h3 class="dish-card__title">${d.title[state.lang]}</h3>
          <p class="dish-card__desc">${d.desc[state.lang]}</p>
          <div class="dish-card__tags">${allergens}${stockTag}</div>
          <div class="dish-card__meta">
            <div>
              <div class="dish-card__price">${fmtPrice(d.base)}</div>
              <div class="dish-card__terr">${state.lang === "es" ? "Terraza" : "Terrace"} · ${fmtPrice(d.terr)}</div>
            </div>
          </div>
        </article>`;
    }).join("");

    const writeContent = () => {
      grid.innerHTML = cards || `<p style="text-align:center;color:var(--ink-mute);grid-column:1/-1">—</p>`;
    };

    if (animateSwap) {
      grid.classList.add("is-swapping");
      setTimeout(() => {
        writeContent();
        requestAnimationFrame(() => grid.classList.remove("is-swapping"));
      }, 220);
    } else {
      writeContent();
    }
  }

  // ---------- Render: public hours ----------
  function renderPublicHours() {
    const grid = $("#publicHoursGrid");
    if (!grid) return;
    grid.innerHTML = HOURS.map((h) => {
      const name = DAY_NAMES[state.lang][h.day];
      const lunch = h.lunch[0] ? `${h.lunch[0]} — ${h.lunch[1]}` : null;
      const dinner = h.dinner[0] ? `${h.dinner[0]} — ${h.dinner[1]}` : null;
      const closedLabel = state.lang === "es" ? "Cerrado noche" : "Closed at night";
      return `
        <div class="hours-day">
          <strong>${name}</strong>
          ${lunch ? `<small>${state.lang === "es" ? "Comidas" : "Lunch"}: ${lunch}</small>` : ""}
          ${dinner ? `<small>${state.lang === "es" ? "Cenas" : "Dinner"}: ${dinner}</small>` : `<small class="closed">${closedLabel}</small>`}
        </div>
      `;
    }).join("");
  }

  // ---------- Menu tabs ----------
  function setMenuTab(tab) {
    state.menuTab = tab;
    $$(".tab-btn").forEach((b) => b.classList.toggle("is-active", b.dataset.menuTab === tab));
    positionTabIndicator();
    renderPublicMenu(true);
  }

  function positionTabIndicator() {
    const active = $(".tab-btn.is-active");
    const indicator = $(".tab-indicator");
    if (!active || !indicator) return;
    const parentRect = active.parentElement.getBoundingClientRect();
    const rect = active.getBoundingClientRect();
    indicator.style.left = (rect.left - parentRect.left) + "px";
    indicator.style.width = rect.width + "px";
  }

  // ---------- Dashboard: inventory ----------
  function renderInventory() {
    const body = $("#invBody");
    if (!body) return;
    const term = state.invFilter.trim().toLowerCase();

    const rows = DISHES.filter((d) => {
      if (!term) return true;
      const hay = [
        d.title[state.lang],
        d.cat,
        t("cat." + d.cat),
        ...d.allergens.map((a) => ALLERGEN_LABELS[state.lang][a] || a)
      ].join(" ").toLowerCase();
      return hay.includes(term);
    }).map((d) => {
      const allergenChips = ALLERGEN_KEYS.map((a) => {
        const checked = d.allergens.includes(a);
        const disabled = state.role === "view" ? "disabled" : "";
        return `
          <label class="allergen-check ${checked ? "is-on" : ""}">
            <input type="checkbox" data-allergen="${a}" data-dish="${d.id}" ${checked ? "checked" : ""} ${disabled} />
            ${ALLERGEN_LABELS[state.lang][a]}
          </label>`;
      }).join("");

      const priceDisabled = state.role !== "admin";
      const stockDisabled = state.role === "view" ? "disabled" : "";
      const allowDelete = state.role === "admin";

      return `
        <tr data-id="${d.id}">
          <td>
            <div class="dish-name">
              <strong>${d.title[state.lang]}</strong>
              <small>${d.desc[state.lang]}</small>
            </div>
          </td>
          <td><span class="cat-pill">${t("cat." + d.cat)}</span></td>
          <td>
            <input class="price-input" type="number" step="0.10" min="0" value="${d.base.toFixed(2)}"
                   data-price="base" data-dish="${d.id}" ${priceDisabled ? "disabled" : ""}/>
          </td>
          <td>
            <input class="price-input price-input--terr" type="number" step="0.10" min="0" value="${d.terr.toFixed(2)}"
                   data-price="terr" data-dish="${d.id}" ${priceDisabled ? "disabled" : ""}/>
          </td>
          <td><div class="allergen-checks">${allergenChips}</div></td>
          <td>
            <label class="switch-label">
              <label class="switch stock-switch">
                <input type="checkbox" ${d.stock ? "checked" : ""} ${stockDisabled} data-stock="${d.id}" />
                <span class="slider"></span>
              </label>
              <span>${d.stock ? (state.lang === "es" ? "En stock" : "In stock") : (state.lang === "es" ? "Agotado" : "Out")}</span>
            </label>
          </td>
          <td>
            <div class="action-btns">
              <button class="icon-btn" title="Editar" ${state.role === "view" ? "disabled" : ""}>✎</button>
              <button class="icon-btn icon-btn--danger" data-delete="${d.id}" title="Eliminar" ${allowDelete ? "" : "disabled"}>🗑</button>
            </div>
          </td>
        </tr>`;
    }).join("");

    body.innerHTML = rows || `<tr><td colspan="7" style="text-align:center;color:var(--ink-mute);padding:30px">—</td></tr>`;
    updateKPIs();
  }

  function updateKPIs() {
    $("#kpiProducts").textContent = DISHES.filter((d) => d.stock).length;
    $("#kpiOutstock").textContent = DISHES.filter((d) => !d.stock).length;
    // shift indicator (computed from current time, lightly)
    const now = new Date();
    const h = now.getHours();
    const isLunch = h >= 11 && h < 18;
    $("#kpiShift").textContent = isLunch
      ? (state.lang === "es" ? "Comidas" : "Lunch")
      : (state.lang === "es" ? "Cenas" : "Dinner");
    $("#kpiShiftHours").textContent = isLunch ? "13:00 — 16:30" : "20:00 — 23:30";
  }

  // ---------- Dashboard: hours form ----------
  function renderHoursForm() {
    const form = $("#hoursForm");
    if (!form) return;
    const readonly = state.role !== "admin" ? "disabled" : "";

    const header = `
      <div class="h-head">${state.lang === "es" ? "Día" : "Day"}</div>
      <div class="h-head">${state.lang === "es" ? "Comidas" : "Lunch"}</div>
      <div class="h-head">${state.lang === "es" ? "Cenas" : "Dinner"}</div>
      <div class="h-head">${state.lang === "es" ? "Abierto" : "Open"}</div>
    `;

    const rows = HOURS.map((h) => `
      <div class="h-day">${DAY_NAMES[state.lang][h.day]}</div>
      <div class="h-shift h-shift--lunch">
        <input type="time" value="${h.lunch[0] || ""}" ${readonly} data-hours="${h.day}-lunch-open"/>
        <small>—</small>
        <input type="time" value="${h.lunch[1] || ""}" ${readonly} data-hours="${h.day}-lunch-close"/>
      </div>
      <div class="h-shift h-shift--cena">
        <input type="time" value="${h.dinner[0] || ""}" ${readonly} data-hours="${h.day}-dinner-open"/>
        <small>—</small>
        <input type="time" value="${h.dinner[1] || ""}" ${readonly} data-hours="${h.day}-dinner-close"/>
      </div>
      <label class="switch">
        <input type="checkbox" ${h.open ? "checked" : ""} ${readonly}/>
        <span class="slider"></span>
      </label>
    `).join("");

    form.innerHTML = header + rows;
  }

  // ---------- Dashboard tabs ----------
  function setDashTab(tab) {
    state.dashTab = tab;
    $$(".snav").forEach((b) => b.classList.toggle("is-active", b.dataset.dashTab === tab));
    $$("[data-dash-panel]").forEach((p) => {
      p.hidden = p.getAttribute("data-dash-panel") !== tab;
    });
    const titleEl = $("#dashSectionTitle");
    const map = {
      inventory: "dash.title.inventory",
      promos: "dash.title.promos",
      hours: "dash.title.hours",
      channels: "dash.title.channels",
      content: "dash.title.content",
      reservations: "dash.title.reservations",
      wall: "dash.title.wall",
      images: "dash.title.images",
      customers: "dash.title.customers",
      design: "dash.title.design",
      payments: "dash.title.payments",
      pets: "dash.title.pets",
      backup: "dash.title.backup",
      stats: "dash.title.stats",
      consumption: "dash.title.consumption"
    };
    if (map[tab]) {
      titleEl.setAttribute("data-i18n", map[tab]);
      titleEl.textContent = t(map[tab]);
    }
    // Renders por tab
    if (tab === "content") renderContentEditorPanel();
    if (tab === "reservations") renderReservations();
    if (tab === "wall") renderWallModeration();
    if (tab === "images") renderImageManager();
    if (tab === "customers") renderCustomersPanel();
    if (tab === "design") renderDesignPanel();
    if (tab === "payments") renderPaymentsPanel();
    if (tab === "pets") renderPetsModeration();
    if (tab === "backup") renderBackupPanel();
    if (tab === "stats") renderStatsPanel();
    if (tab === "consumption") renderConsumptionPanel();
  }

  // ---------- Role ----------
  function setRole(role) {
    state.role = role;
    document.body.setAttribute("data-role", role);
    const labels = { admin: "Admin", editor: "Editor", view: state.lang === "es" ? "Camarero" : "Waiter" };
    $("#sidebarRole").textContent = labels[role];
    $("#sidebarAvatar").textContent = labels[role].charAt(0).toUpperCase();
    $$("[data-role-switch]").forEach((b) => b.classList.toggle("is-active", b.dataset.roleSwitch === role));
    renderInventory();
    renderHoursForm();
    toast(`${t("toast.roleSwitched")} ${labels[role]}`);
  }

  // ---------- View ----------
  function setView(view) {
    // SECURITY GUARD: el dashboard requiere admin logueado
    if (typeof authGuardForView === "function" && !authGuardForView(view)) {
      // El guard ya abrió el login overlay; no cambiamos la vista
      return;
    }
    state.view = view;
    document.body.setAttribute("data-view", view);
    $$("[data-view-switch]").forEach((b) => b.classList.toggle("is-active", b.dataset.viewSwitch === view));
    if (view === "dashboard") {
      renderInventory();
      renderHoursForm();
    }
    const label = view === "public" ? (state.lang === "es" ? "Sitio Público" : "Public Site") : "Backoffice";
    toast(`${t("toast.viewSwitched")} ${label}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ---------- Language ----------
  function setLang(lang) {
    state.lang = lang;
    document.body.setAttribute("data-lang", lang);
    $$("[data-lang-switch]").forEach((b) => b.classList.toggle("is-active", b.dataset.langSwitch === lang));
    applyI18n();
    renderPublicMenu(false);
    renderPublicHours();
    renderInventory();
    renderHoursForm();
    // refresh dash title label
    const titleEl = $("#dashSectionTitle");
    if (titleEl && titleEl.getAttribute("data-i18n")) {
      titleEl.textContent = t(titleEl.getAttribute("data-i18n"));
    }
    // refresh role label
    setRoleLabelOnly();
    toast(t("toast.langSwitched"));
  }

  function setRoleLabelOnly() {
    const labels = { admin: "Admin", editor: "Editor", view: state.lang === "es" ? "Camarero" : "Waiter" };
    $("#sidebarRole").textContent = labels[state.role];
  }

  // ---------- CRUD handlers ----------
  function handleInvBodyChange(e) {
    const target = e.target;
    const dishId = target.dataset.dish;
    if (!dishId) return;
    const dish = DISHES.find((d) => d.id === dishId);
    if (!dish) return;

    if (target.dataset.price && state.role === "admin") {
      const which = target.dataset.price;
      const val = parseFloat(target.value);
      if (!isNaN(val)) {
        dish[which] = val;
        toast(t("toast.priceSaved"));
        renderPublicMenu(false);
      }
    }
    if (target.dataset.stock !== undefined && state.role !== "view") {
      dish.stock = target.checked;
      toast(t("toast.stockToggled"));
      renderInventory();
      renderPublicMenu(false);
    }
    if (target.dataset.allergen && state.role !== "view") {
      const a = target.dataset.allergen;
      if (target.checked) {
        if (!dish.allergens.includes(a)) dish.allergens.push(a);
      } else {
        dish.allergens = dish.allergens.filter((x) => x !== a);
      }
      const label = target.closest(".allergen-check");
      if (label) label.classList.toggle("is-on", target.checked);
      toast(t("toast.allergenToggled"));
      renderPublicMenu(false);
    }
  }

  function handleInvBodyClick(e) {
    const del = e.target.closest("[data-delete]");
    if (del && state.role === "admin") {
      const id = del.getAttribute("data-delete");
      const idx = DISHES.findIndex((d) => d.id === id);
      if (idx > -1) {
        DISHES.splice(idx, 1);
        renderInventory();
        renderPublicMenu(false);
        toast(t("toast.deleted"));
      }
    }
  }

  function handleAddProduct() {
    if (state.role !== "admin") { toast(t("toast.noPerm")); return; }
    const id = "d" + (Date.now() % 100000);
    DISHES.unshift({
      id,
      cat: "tapas",
      title: { es: "Nueva tapa", en: "New tapa" },
      desc: { es: "Descripción pendiente.", en: "Description pending." },
      base: 5.00, terr: 6.00,
      allergens: [],
      stock: true
    });
    renderInventory();
    renderPublicMenu(false);
    toast(t("toast.added"));
  }

  // ---------- Init ----------
  function bindEvents() {
    $$("[data-view-switch]").forEach((b) => b.addEventListener("click", () => setView(b.dataset.viewSwitch)));
    $$("[data-role-switch]").forEach((b) => b.addEventListener("click", () => setRole(b.dataset.roleSwitch)));
    $$("[data-lang-switch]").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.langSwitch)));

    $$(".tab-btn").forEach((b) => b.addEventListener("click", () => setMenuTab(b.dataset.menuTab)));
    $$(".snav").forEach((b) => b.addEventListener("click", () => setDashTab(b.dataset.dashTab)));

    const body = $("#invBody");
    if (body) {
      body.addEventListener("change", handleInvBodyChange);
      body.addEventListener("click", handleInvBodyClick);
    }
    const search = $("#invSearch");
    if (search) {
      search.addEventListener("input", () => {
        state.invFilter = search.value;
        renderInventory();
      });
    }
    const addBtn = $("#addProductBtn");
    if (addBtn) addBtn.addEventListener("click", handleAddProduct);

    const saveHours = $("#saveHoursBtn");
    if (saveHours) saveHours.addEventListener("click", () => {
      if (state.role !== "admin") { toast(t("toast.noPerm")); return; }
      toast(t("toast.savedHours"));
    });

    $$(".card__actions .btn--primary[data-role-restrict='admin']").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        if (state.role !== "admin") { toast(t("toast.noPerm")); return; }
        toast(t("toast.savedPromo"));
      });
    });

    const newPromo = $("#newPromoBtn");
    if (newPromo) newPromo.addEventListener("click", () => {
      if (state.role !== "admin") { toast(t("toast.noPerm")); return; }
      toast(t("toast.savedPromo"));
    });

    window.addEventListener("resize", () => positionTabIndicator());

    // Navbar transparent → solid on scroll
    const navbar = $("#mainNavbar");
    if (navbar) {
      const onScroll = () => {
        navbar.classList.toggle("is-scrolled", window.scrollY > 60);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    // Demo widget toggle
    const demo = $("#demoWidget");
    if (demo) {
      const toggle = demo.querySelector(".demo-widget__toggle");
      toggle.addEventListener("click", () => {
        const open = demo.getAttribute("data-open") === "true";
        demo.setAttribute("data-open", open ? "false" : "true");
      });
      // Close demo when clicking outside
      document.addEventListener("click", (e) => {
        if (!demo.contains(e.target)) demo.setAttribute("data-open", "false");
      });
    }
  }

  function init() {
    $("#year").textContent = new Date().getFullYear();
    applyI18n();
    renderPublicMenu(false);
    renderPublicHours();
    renderInventory();
    renderHoursForm();
    bindEvents();
    // Magic link callback · si el hash de la URL trae access_token,
    // guardamos la sesión y redirigimos al dashboard.
    handleMagicLinkArrival();
    // Si la URL pide ?view=dashboard, intentamos abrirlo (con auth guard).
    if (new URLSearchParams(location.search).get("view") === "dashboard") {
      setTimeout(() => setView("dashboard"), 100);
    }
    // Position the tab indicator after layout settles
    requestAnimationFrame(() => positionTabIndicator());
    // Trigger hero entrance after frame
    requestAnimationFrame(() => document.body.classList.add("is-loaded"));
  }

  /**
   * Si llegamos con un magic link (hash con access_token), guardamos sesión,
   * hidratamos currentUser desde el JWT, abrimos dashboard y mostramos tour.
   */
  function handleMagicLinkArrival() {
    if (!window.cbBackend || !window.cbBackend.handleMagicLinkCallback) return;
    window.cbBackend.handleMagicLinkCallback().then((ok) => {
      if (!ok) return;
      const u = window.cbBackend.currentUser();
      if (!u || !ADMIN_EMAILS.includes(u.email)) {
        toast("Email no autorizado como admin");
        return;
      }
      currentUser = {
        email: u.email,
        name: u.email.split("@")[0],
        picture: "",
        exp: Date.now() + 12 * 60 * 60 * 1000
      };
      persistAuth(currentUser);
      updateAuthUI();
      closeLoginOverlay();
      setView("dashboard");
      toast(state.lang === "es"
        ? `¡Hola ${currentUser.name}! Bienvenido al dashboard.`
        : `Hi ${currentUser.name}! Welcome to the dashboard.`);
      // Onboarding tour: solo la primera vez
      setTimeout(() => {
        const seen = localStorage.getItem("cb.tour.seen");
        if (!seen) startDashboardTour();
      }, 800);
    });
  }

  /* =====================================================
     RESERVATION FLOW  (WhatsApp + Google Calendar + Email)
     ===================================================== */
  const WA_NUMBER = "34611854380";
  const BAR_EMAIL = "capitanbetomadrid@gmail.com";
  const FORMSUBMIT_URL = "https://formsubmit.co/ajax/" + BAR_EMAIL;

  function openReserveModal() {
    const modal = $("#reserveModal");
    if (!modal) return;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    // Default date today + format
    const dateInput = modal.querySelector('input[name="date"]');
    if (dateInput && !dateInput.value) {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      dateInput.value = d.toISOString().slice(0, 10);
      dateInput.min = new Date().toISOString().slice(0, 10);
    }
    goToReserveStep(1);
  }
  function closeReserveModal() {
    const modal = $("#reserveModal");
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  function goToReserveStep(step) {
    $$(".reserve-step").forEach((s) => s.classList.toggle("is-active", s.dataset.step == step));
    const next = $("[data-reserve-next]");
    const back = $("[data-reserve-back]");
    if (step === 1) {
      next.removeAttribute("hidden");
      next.textContent = t("reserve.next");
      back.setAttribute("hidden", "");
    } else {
      next.setAttribute("hidden", "");
      back.removeAttribute("hidden");
    }
  }
  function readReserveForm() {
    const form = $("#reserveForm");
    const data = new FormData(form);
    const out = {};
    for (const [k, v] of data.entries()) out[k] = v;
    return out;
  }
  function reserveSummaryHTML(r) {
    const zoneLabel = {
      terraza: state.lang === "es" ? "Terraza (dog-friendly)" : "Terrace (dog-friendly)",
      barra: state.lang === "es" ? "Barra" : "Bar",
      comedor: state.lang === "es" ? "Comedor" : "Dining room"
    }[r.zone] || r.zone;
    const labelMap = {
      es: { name: "Nombre", phone: "Teléfono", date: "Fecha", time: "Hora", people: "Comensales", zone: "Zona", notes: "Notas" },
      en: { name: "Name", phone: "Phone", date: "Date", time: "Time", people: "Guests", zone: "Area", notes: "Notes" }
    }[state.lang];
    const niceDate = new Date(r.date + "T" + r.time).toLocaleDateString(state.lang === "es" ? "es-ES" : "en-GB", {
      weekday: "long", day: "numeric", month: "long"
    });
    return `
      <div class="row"><span>${labelMap.name}</span><strong>${escapeHtml(r.name || "—")}</strong></div>
      <div class="row"><span>${labelMap.phone}</span><strong>${escapeHtml(r.phone || "—")}</strong></div>
      <div class="row"><span>${labelMap.date}</span><strong>${niceDate}</strong></div>
      <div class="row"><span>${labelMap.time}</span><strong>${r.time}</strong></div>
      <div class="row"><span>${labelMap.people}</span><strong>${r.people}</strong></div>
      <div class="row"><span>${labelMap.zone}</span><strong>${zoneLabel}</strong></div>
      ${r.notes ? `<div class="row"><span>${labelMap.notes}</span><strong>${escapeHtml(r.notes)}</strong></div>` : ""}
    `;
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  // ============ UNIVERSAL IMAGE FILE HELPER ============
  // Acepta HEIC/HEIF (iPhone), WebP, AVIF, TIFF, BMP, SVG, GIF, JFIF
  // además de JPG/PNG. Si el MIME viene vacío (algunos sistemas con HEIC),
  // se valida por extensión.
  const IMG_EXT_RE = /\.(jpe?g|jfif|png|gif|webp|avif|heic|heif|tiff?|bmp|svg|ico)$/i;
  function isImageFile(file) {
    if (!file) return false;
    if (file.type && /^image\//i.test(file.type)) return true;
    if (file.name && IMG_EXT_RE.test(file.name)) return true;
    return false;
  }
  function isHeicFile(file) {
    if (!file) return false;
    if (file.type && /heic|heif/i.test(file.type)) return true;
    if (file.name && /\.(heic|heif)$/i.test(file.name)) return true;
    return false;
  }

  /**
   * Placeholder PNG (vía canvas) que mostramos cuando el formato de la
   * foto no se puede previsualizar en el navegador (HEIC en Chrome/Firefox).
   * La foto original SÍ se guarda en `originalDataURL`.
   */
  function placeholderForFormat(file, label) {
    const c = document.createElement("canvas");
    c.width = 600; c.height = 600;
    const x = c.getContext("2d");
    const g = x.createLinearGradient(0, 0, 600, 600);
    g.addColorStop(0, "#1F4A2E"); g.addColorStop(1, "#173823");
    x.fillStyle = g; x.fillRect(0, 0, 600, 600);
    x.fillStyle = "#F7EFDC";
    x.font = "bold 96px sans-serif"; x.textAlign = "center";
    x.fillText("📷", 300, 260);
    x.font = "bold 36px sans-serif"; x.fillText(label || "Foto", 300, 330);
    x.font = "20px sans-serif";
    const name = (file.name || "").slice(0, 30);
    if (name) x.fillText(name, 300, 380);
    x.font = "16px sans-serif";
    x.fillStyle = "rgba(247,239,220,0.7)";
    x.fillText("Foto guardada ✓", 300, 430);
    return c.toDataURL("image/png");
  }

  /**
   * Comprime un dataURL a JPEG con dimensión máxima y calidad dada.
   * Esencial para que las fotos quepan en localStorage (~5 MB quota).
   * Una foto iPhone (3-5 MB HEIC/JPEG) baja a ~150-300 KB sin pérdida visible.
   */
  function compressDataURL(dataURL, maxDim = 1400, quality = 0.82) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        let { width: w, height: h } = img;
        if (w > maxDim || h > maxDim) {
          if (w >= h) { h = Math.round(h * (maxDim / w)); w = maxDim; }
          else { w = Math.round(w * (maxDim / h)); h = maxDim; }
        }
        const c = document.createElement("canvas");
        c.width = w; c.height = h;
        const ctx = c.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        try {
          resolve(c.toDataURL("image/jpeg", quality));
        } catch (e) {
          // SVG en canvas tainted o algo raro → devolvemos el original
          resolve(dataURL);
        }
      };
      img.onerror = () => resolve(dataURL); // si la imagen no se puede decodificar (HEIC en Chrome) → original
      img.src = dataURL;
    });
  }

  /**
   * Wrapper de localStorage.setItem con manejo de QuotaExceededError.
   * Devuelve true si guardó, false si falló por quota.
   */
  function safeSetItem(key, value) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (e) {
      const isQuota =
        e && (e.name === "QuotaExceededError" ||
              e.code === 22 ||
              e.code === 1014 ||
              /quota/i.test(e.message || ""));
      if (isQuota) {
        toast(state.lang === "es"
          ? "⚠️ Espacio agotado en el navegador. Hacé backup desde Dashboard → Backup CMS y borrá fotos viejas."
          : "⚠️ Browser storage is full. Export a backup from Dashboard → Backup CMS and remove old photos.");
      }
      console.warn("safeSetItem failed:", key, e);
      return false;
    }
  }

  /**
   * Lee CUALQUIER imagen y devuelve un dataURL OPTIMIZADO (comprimido).
   * - JPG / PNG / GIF / WebP / AVIF / SVG → lectura directa + compresión a 1400px JPEG q0.82.
   * - HEIC / HEIF (Safari sí lo renderiza, otros no) → guarda el original
   *   pero usa un placeholder visual para que el preview no esté roto.
   * Promesa: { dataURL, originalDataURL, file, converted, fallback }
   */
  function readImageToDataURL(file) {
    return new Promise((resolve, reject) => {
      if (!isImageFile(file)) return reject(new Error("not_image"));
      const r = new FileReader();
      r.onload = () => {
        const original = r.result;
        if (isHeicFile(file)) {
          const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
          if (isSafari) {
            // Safari renderiza HEIC en canvas → podemos comprimir.
            compressDataURL(original, 1400, 0.82).then((compressed) => {
              resolve({ dataURL: compressed, originalDataURL: original, file, converted: true, fallback: false });
            });
          } else {
            toast(state.lang === "es"
              ? "Foto HEIC guardada (preview no disponible en este navegador)."
              : "HEIC photo saved (preview not available in this browser).");
            resolve({
              dataURL: placeholderForFormat(file, "HEIC"),
              originalDataURL: original,
              file,
              converted: false,
              fallback: true
            });
          }
        } else {
          // Comprimir a JPEG 1400px q0.82 para entrar en localStorage quota.
          compressDataURL(original, 1400, 0.82).then((compressed) => {
            resolve({ dataURL: compressed, originalDataURL: original, file, converted: true, fallback: false });
          });
        }
      };
      r.onerror = () => reject(new Error("read_failed"));
      r.readAsDataURL(file);
    });
  }
  function buildWaURL(r) {
    const intro = t("wa.bot.summary").replace("{{name}}", r.name || "");
    const lines = [
      intro,
      "",
      `• ${state.lang === "es" ? "Fecha" : "Date"}: ${r.date}  ${r.time}`,
      `• ${state.lang === "es" ? "Comensales" : "Guests"}: ${r.people}`,
      `• ${state.lang === "es" ? "Zona" : "Area"}: ${r.zone}`,
      r.notes ? `• ${state.lang === "es" ? "Notas" : "Notes"}: ${r.notes}` : "",
      "",
      `${state.lang === "es" ? "Tel:" : "Phone:"} ${r.phone}`
    ].filter(Boolean).join("\n");
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines)}`;
  }
  function buildGoogleCalURL(r) {
    // Build start/end in YYYYMMDDTHHmmss local-floating format.
    const startDate = new Date(r.date + "T" + r.time);
    const endDate = new Date(startDate.getTime() + 90 * 60 * 1000);
    const fmt = (d) => {
      const pad = (n) => String(n).padStart(2, "0");
      return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
    };
    const dates = `${fmt(startDate)}/${fmt(endDate)}`;
    const title = state.lang === "es" ? `Reserva · Capitán Beto (${r.people} pax)` : `Booking · Capitán Beto (${r.people} pax)`;
    const details = (state.lang === "es"
      ? `Reserva en Capitán Beto — Gastro Taberna\nCliente: ${r.name}\nTeléfono: ${r.phone}\nZona: ${r.zone}\nComensales: ${r.people}\nWhatsApp del bar: +34 611 854 380\nEmail del bar: ${BAR_EMAIL}`
      : `Booking at Capitán Beto — Gastro Taberna\nCustomer: ${r.name}\nPhone: ${r.phone}\nArea: ${r.zone}\nGuests: ${r.people}\nBar WhatsApp: +34 611 854 380\nBar email: ${BAR_EMAIL}`) + (r.notes ? `\n\n${state.lang === "es" ? "Notas" : "Notes"}: ${r.notes}` : "");
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: title,
      dates,
      details,
      location: "Calle de los Hidalgos, Madrid",
      add: BAR_EMAIL,   // invites the bar as attendee → bar receives notification
      ctz: "Europe/Madrid"
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }

  async function sendReservationByEmail(r) {
    // Posts the booking to FormSubmit.co which forwards to BAR_EMAIL.
    // FIRST submission ever requires owner to click activation link in inbox.
    const subject = `[Reserva] ${r.name} · ${r.date} ${r.time} · ${r.people} pax`;
    const body = [
      "Nueva reserva desde la web — Capitán Beto · Gastro Taberna",
      "",
      `Cliente:     ${r.name}`,
      `Teléfono:    ${r.phone}`,
      `Fecha:       ${r.date}`,
      `Hora:        ${r.time}`,
      `Comensales:  ${r.people}`,
      `Zona:        ${r.zone}`,
      r.notes ? `Notas:       ${r.notes}` : "",
      "",
      "—",
      "Recibido vía formulario web. Confirma al cliente por WhatsApp (+34 611 854 380) o devolviendo este mail."
    ].filter(Boolean).join("\n");

    const payload = {
      _subject: subject,
      _template: "table",
      _captcha: "false",
      _replyto: r.email || "",
      name: r.name,
      phone: r.phone,
      date: r.date,
      time: r.time,
      people: r.people,
      zone: r.zone,
      notes: r.notes || "",
      message: body
    };

    try {
      const res = await fetch(FORMSUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));
      return res.ok && (data.success === "true" || data.success === true);
    } catch (e) {
      return false;
    }
  }

  function buildMailtoFallback(r) {
    const subject = encodeURIComponent(`[Reserva] ${r.name} · ${r.date} ${r.time} · ${r.people} pax`);
    const body = encodeURIComponent([
      "Nueva reserva — Capitán Beto",
      "",
      `Cliente:    ${r.name}`,
      `Teléfono:   ${r.phone}`,
      `Fecha:      ${r.date} ${r.time}`,
      `Comensales: ${r.people}`,
      `Zona:       ${r.zone}`,
      r.notes ? `Notas:      ${r.notes}` : ""
    ].filter(Boolean).join("\n"));
    return `mailto:${BAR_EMAIL}?subject=${subject}&body=${body}`;
  }

  /* =====================================================
     CHATBOT  (intent matching + handover to human)
     ===================================================== */
  const INTENTS = [
    { id: "reserve", keys: ["reserv", "mesa", "book", "table"], reply: "chat.a.reserveStart", cta: ["openForm", "human"] },
    { id: "hours", keys: ["hora", "abr", "abier", "open", "cuando", "when", "schedule", "hour"], reply: "chat.a.hours", cta: ["reserve", "human"] },
    { id: "location", keys: ["donde", "dónde", "ubic", "direcc", "where", "address", "metro", "llegar"], reply: "chat.a.location", cta: ["maps", "human"] },
    { id: "pet", keys: ["perro", "dog", "mascota", "pet", "friendly", "gato", "cat", "conejo", "rabbit", "huron", "ferret", "animal"], reply: "chat.a.pet", cta: ["reserve", "human"] },
    { id: "menu", keys: ["carta", "menu", "menú", "tapa", "pizarra", "slate", "comer", "comida", "food", "plato", "today", "hoy"], reply: "chat.a.menu", cta: ["seeMenu", "human"] },
    { id: "allergen", keys: ["alerg", "gluten", "celiac", "vegan", "vegetar", "lact", "frutos"], reply: "chat.a.allergens", cta: ["human", "reserve"] },
    { id: "human", keys: ["persona", "humano", "human", "camarero", "real", "alguien", "talk", "habl", "no entiend", "no me sirve", "no funciona", "ayuda", "help", "frustrat", "agente", "operador"], reply: "chat.a.human", cta: ["humanWa"] }
  ];

  let chatState = {
    pending: null,
    lastUserMsg: "",
    transcript: [],   // {role: 'user'|'bot', text}
    failStreak: 0,    // consecutive unknown intents
    handovered: false // already handed over to human this session
  };

  function openChat() {
    $("#chatWidget").classList.add("is-open");
    $("#chatWidget").setAttribute("aria-hidden", "false");
    $("#chatUnread").setAttribute("hidden", "");
    const body = $("#chatBody");
    if (body && body.children.length === 0) {
      botSay(t("chat.welcome"));
      setQuickReplies(["reserve", "hours", "location", "pet", "menu", "allergens", "human"]);
    }
  }
  function closeChat() {
    $("#chatWidget").classList.remove("is-open");
    $("#chatWidget").setAttribute("aria-hidden", "true");
  }
  function botSay(text, delay = 600) {
    const body = $("#chatBody");
    const typing = document.createElement("div");
    typing.className = "typing";
    typing.innerHTML = "<span></span><span></span><span></span>";
    body.appendChild(typing);
    body.scrollTop = body.scrollHeight;
    setTimeout(() => {
      typing.remove();
      const m = document.createElement("div");
      m.className = "chat-msg chat-msg--bot";
      m.textContent = text;
      body.appendChild(m);
      body.scrollTop = body.scrollHeight;
      chatState.transcript.push({ role: "bot", text });
    }, delay);
  }
  function userSay(text) {
    const body = $("#chatBody");
    const m = document.createElement("div");
    m.className = "chat-msg chat-msg--user";
    m.textContent = text;
    body.appendChild(m);
    body.scrollTop = body.scrollHeight;
    chatState.transcript.push({ role: "user", text });
  }
  function systemSay(text) {
    const body = $("#chatBody");
    const m = document.createElement("div");
    m.className = "chat-msg chat-msg--system";
    m.textContent = text;
    body.appendChild(m);
    body.scrollTop = body.scrollHeight;
  }
  function setQuickReplies(ids) {
    const q = $("#chatQuick");
    q.innerHTML = "";
    const labelMap = {
      reserve: "chat.q.reserve",
      hours: "chat.q.hours",
      location: "chat.q.location",
      pet: "chat.q.pet",
      menu: "chat.q.menu",
      allergens: "chat.q.allergens",
      human: "chat.q.human",
      openForm: "chat.cta.openForm",
      humanWa: "chat.cta.contWa",
      maps: "chat.cta.maps",
      seeMenu: "chat.cta.menu"
    };
    ids.forEach((id) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = t(labelMap[id] || id);
      btn.dataset.quick = id;
      q.appendChild(btn);
    });
  }
  function handleIntent(text) {
    chatState.lastUserMsg = text;
    const lower = text.toLowerCase();
    const intent = INTENTS.find((i) => i.keys.some((k) => lower.includes(k)));
    if (!intent) {
      chatState.failStreak += 1;
      if (chatState.failStreak >= 2 && !chatState.handovered) {
        // Auto-escalate after 2 consecutive unknowns
        botSay(t("chat.escalateAuto"), 700);
        setTimeout(() => offerHumanHandover("auto"), 1200);
        return;
      }
      botSay(t("chat.unknown"), 700);
      setQuickReplies(["human", "reserve", "hours"]);
      return;
    }
    chatState.failStreak = 0; // reset on success
    botSay(t(intent.reply), 700);
    setQuickReplies(intent.cta);
  }

  function buildTranscriptForWa(maxLines = 10) {
    const lines = chatState.transcript.slice(-maxLines).map((m) => {
      const who = m.role === "user" ? t("wa.transcript.you") : t("wa.transcript.bot");
      return `${who}: ${m.text}`;
    });
    return [t("wa.transcript.header"), "", ...lines].join("\n");
  }

  function offerHumanHandover(reason) {
    chatState.handovered = true;
    const body = $("#chatBody");
    const transcriptText = buildTranscriptForWa();
    const lastUserLine = chatState.lastUserMsg || "—";
    const waMessage = [
      t("wa.bot.human") + " " + lastUserLine,
      "",
      transcriptText
    ].join("\n");
    const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessage)}`;

    const card = document.createElement("div");
    card.className = "handover-card";
    card.innerHTML = `
      <div class="handover-card__head">
        <span class="handover-card__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11 11 0 0 0 3.6 17.8L2 22l4.3-1.5A11 11 0 1 0 20.5 3.5Zm-8.4 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-2.6.9.9-2.5-.2-.3A9.1 9.1 0 1 1 21.2 12 9.1 9.1 0 0 1 12.1 20.5Zm5-6.8c-.3-.1-1.6-.8-1.9-.9s-.4-.1-.6.2-.7.9-.9 1.1-.3.2-.6.1a7.5 7.5 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.5.1-.6s.3-.3.4-.5a2 2 0 0 0 .3-.5.5.5 0 0 0 0-.5c0-.1-.6-1.5-.8-2s-.5-.4-.6-.4h-.6a1.1 1.1 0 0 0-.8.4 3.4 3.4 0 0 0-1.1 2.6c0 1.5 1.1 3 1.3 3.2s2.2 3.4 5.4 4.7a18 18 0 0 0 1.8.7 4.3 4.3 0 0 0 2 .1 3.3 3.3 0 0 0 2.2-1.6 2.7 2.7 0 0 0 .2-1.6c0-.1-.3-.2-.6-.4Z"/></svg>
        </span>
        <div>
          <strong>${t("chat.handover.title")}</strong>
          <small>${t("chat.handover.subtitle")}</small>
        </div>
      </div>
      <div class="handover-card__body">${t("chat.handover.body")}</div>
      <a class="handover-card__cta" href="${waUrl}" target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 3.5A11 11 0 0 0 3.6 17.8L2 22l4.3-1.5A11 11 0 1 0 20.5 3.5Zm-8.4 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-2.6.9.9-2.5-.2-.3A9.1 9.1 0 1 1 21.2 12 9.1 9.1 0 0 1 12.1 20.5Zm5-6.8c-.3-.1-1.6-.8-1.9-.9s-.4-.1-.6.2-.7.9-.9 1.1-.3.2-.6.1a7.5 7.5 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.5.1-.6s.3-.3.4-.5a2 2 0 0 0 .3-.5.5.5 0 0 0 0-.5c0-.1-.6-1.5-.8-2s-.5-.4-.6-.4h-.6a1.1 1.1 0 0 0-.8.4 3.4 3.4 0 0 0-1.1 2.6c0 1.5 1.1 3 1.3 3.2s2.2 3.4 5.4 4.7a18 18 0 0 0 1.8.7 4.3 4.3 0 0 0 2 .1 3.3 3.3 0 0 0 2.2-1.6 2.7 2.7 0 0 0 .2-1.6c0-.1-.3-.2-.6-.4Z"/></svg>
        ${t("chat.handover.cta")}
      </a>
      <div class="handover-card__foot">${t("chat.handover.foot")}</div>
    `;
    body.appendChild(card);
    body.scrollTop = body.scrollHeight;

    // Auto-open WhatsApp if escalation was the user's explicit choice (not auto)
    if (reason === "user") {
      setTimeout(() => window.open(waUrl, "_blank"), 600);
    }

    // CTA click also logs a system note
    card.querySelector(".handover-card__cta").addEventListener("click", () => {
      systemSay(t("chat.handover.systemNote"));
      chatState.handovered = true;
    });

    // Optional follow-up quick replies after handover
    setQuickReplies(["reserve", "hours"]);
  }
  function runQuickAction(id) {
    if (id === "reserve") {
      botSay(t("chat.a.reserveStart"));
      setQuickReplies(["openForm", "human"]);
    } else if (id === "hours") { botSay(t("chat.a.hours")); setQuickReplies(["reserve", "human"]); }
    else if (id === "location") { botSay(t("chat.a.location")); setQuickReplies(["maps", "human"]); }
    else if (id === "pet") { botSay(t("chat.a.pet")); setQuickReplies(["reserve", "human"]); }
    else if (id === "menu") { botSay(t("chat.a.menu")); setQuickReplies(["seeMenu", "human"]); }
    else if (id === "allergens") { botSay(t("chat.a.allergens")); setQuickReplies(["reserve", "human"]); }
    else if (id === "human") {
      botSay(t("chat.a.human"), 500);
      setTimeout(() => offerHumanHandover("user"), 900);
    }
    else if (id === "humanWa") {
      offerHumanHandover("user");
    }
    else if (id === "openForm") { closeChat(); openReserveModal(); }
    else if (id === "maps") {
      window.open("https://maps.google.com/?q=Calle+de+los+Hidalgos+Madrid", "_blank");
    }
    else if (id === "seeMenu") {
      closeChat();
      document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
    }
  }

  /* =====================================================
     EVENT GALLERY · Argentina Soberana en Capitán Beto
     Imágenes servidas desde Google Drive vía thumbnail API
     (no se descarga nada al servidor — son URLs directas).
     ===================================================== */
  const EVENT_DRIVE_FOLDER = "https://drive.google.com/drive/folders/1j5XS67tg6JZUObILSgCpTS8FRBvR9IUP";
  // 10 fotos seleccionadas del Drive — espaciadas para variedad
  // (si alguna foto incluye personas específicas que no quieres, sustituí el ID)
  const EVENT_PHOTOS = [
    "1b43JzG7LRpi2yeEr_Ebjvj8i5aJSbgMg", // MRA06483
    "1NsASIwWGwAosxhx4xpuvXLoC2fXlKyRZ", // MRA06534 (reemplazó a 06507 que tenía la pareja Ramones)
    "129dfPhO2vKsKCGoD6KEvGzHiwImM3guw", // MRA06528
    "19xm2AT_NQlv8KhIKd7H7rBqp3Vo6I8rG", // MRA06548
    "1VITHj9ZOACn4QdStwIlNUFAaq4QQaxD4", // MRA06567
    "1ezd_QlaQWjXU89JrMU_itg_liPhsZP0x", // MRA06589
    "1gIAALr7R62tDd8V470wzyMHvSaRAFWG9", // MRA06612
    "16TDuj51pPZUlLfcR6kvNVyM20e22vunY", // MRA06647
    "1Efcty2tuvEWggngW_P-tzpsyFX7Ho0Sm", // MRA06678
    "1PjydyjEDUFKAu8Esdmpecg3LLkh6N8pC"  // MRA06717
  ];

  function openLightbox(src) {
    let lb = document.getElementById("evLightbox");
    if (!lb) {
      lb = document.createElement("div");
      lb.id = "evLightbox";
      lb.className = "ev-lightbox";
      lb.innerHTML = `<button class="ev-lightbox__close" aria-label="close">×</button><img alt="" />`;
      document.body.appendChild(lb);
      const close = () => { lb.classList.remove("is-open"); document.body.style.overflow = ""; };
      lb.addEventListener("click", (e) => {
        if (e.target === lb || e.target.classList.contains("ev-lightbox__close")) close();
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lb.classList.contains("is-open")) close();
      });
    }
    lb.querySelector("img").src = src;
    lb.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  // Google Drive endpoints en orden de preferencia (algunos rate-limitan)
  function driveThumb(id, size = 800) {
    return `https://lh3.googleusercontent.com/d/${id}=w${size}-h${size}`;
  }
  function driveFull(id) {
    return `https://lh3.googleusercontent.com/d/${id}=w1800`;
  }
  // Fallback usando proxy wsrv.nl (CDN abierto, respeta hotlinking de Drive)
  function driveProxy(id, size = 800) {
    const url = encodeURIComponent(`https://drive.google.com/uc?export=view&id=${id}`);
    return `https://wsrv.nl/?url=${url}&w=${size}&q=85`;
  }

  function renderEventGrid() {
    const grid = $("#eventGrid");
    if (!grid) return;
    grid.innerHTML = EVENT_PHOTOS.map((id, i) => `
      <a class="ev-tile" data-ev-full="${driveFull(id)}" data-ev-id="${id}" href="https://drive.google.com/file/d/${id}/view" target="_blank" rel="noopener" style="animation-delay:${(i * 0.04).toFixed(2)}s">
        <img src="${driveThumb(id, 800)}"
             alt="Argentina Soberana en Capitán Beto · foto ${i + 1}"
             loading="lazy"
             referrerpolicy="no-referrer"
             onerror="if(!this.dataset.fb){this.dataset.fb=1;this.src='${driveProxy(id, 800)}'}else if(this.dataset.fb==='1'){this.dataset.fb=2;this.src='https://drive.google.com/thumbnail?id=${id}&sz=w800'}else{this.style.display='none'}" />
      </a>
    `).join("");

    // Lightbox al hacer click — intercepta el link
    grid.addEventListener("click", (e) => {
      const tile = e.target.closest(".ev-tile");
      if (!tile) return;
      e.preventDefault();
      openLightbox(tile.dataset.evFull || tile.querySelector("img").src);
    });
  }

  /* =====================================================
     INSTAGRAM FEED (legacy — todavía existe pero se quita del init)
     ===================================================== */

  /* =====================================================
     CONTENT STORE · todo lo editable desde el dashboard
     se guarda en localStorage y se aplica al DOM al cargar.
     ===================================================== */
  const CONTENT_KEY = "cb_content_v1";
  const RESERVE_KEY = "cb_reservations_v1";
  const AUTH_KEY    = "cb_auth_v1";
  const IMG_KEY     = "cb_images_v1";
  const COOKIE_KEY  = "cb_cookie_consent_v1";
  const CUSTOMERS_KEY = "cb_customers_v1";
  const CUSTOMER_SESSION_KEY = "cb_customer_session_v1";
  let contentStore = {};

  /* =====================================================
     AUTH · Google Sign-In + email allowlist
     IMPORTANTE: este guard es CLIENTE-LATERAL (defense in
     depth). No es seguridad real — un atacante con DevTools
     puede bypassearlo. Ver SECURITY.md para limitaciones.
     ===================================================== */

  // ⚠️ Reemplazá por tu Google OAuth Client ID real desde:
  // https://console.cloud.google.com/apis/credentials
  // Cuando esté vacío, se usa modo "demo email login".
  const GOOGLE_CLIENT_ID = "";

  // Allowlist de emails autorizados como admin
  const ADMIN_EMAILS = [
    "info@capitan-beto.com",          // ⭐ email profesional principal
    "capitanbetomadrid@gmail.com",
    "malczewskipablo@gmail.com"       // dev/admin
  ];

  let currentUser = null;

  function loadAuth() {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      if (!raw) return;
      const obj = JSON.parse(raw);
      // Sesión expira a las 12h
      if (obj.exp && Date.now() < obj.exp && ADMIN_EMAILS.includes(obj.email)) {
        currentUser = obj;
      } else {
        localStorage.removeItem(AUTH_KEY);
      }
    } catch (_) {}
  }
  function persistAuth(user) {
    try { localStorage.setItem(AUTH_KEY, JSON.stringify(user)); } catch (_) {}
  }
  function clearAuth() {
    currentUser = null;
    try { localStorage.removeItem(AUTH_KEY); } catch (_) {}
  }

  function isAuthed() {
    return !!currentUser && ADMIN_EMAILS.includes(currentUser.email);
  }

  /**
   * Decodifica un JWT de Google. NO verifica la firma del lado cliente
   * (eso requiere fetch a JWKS de Google + verificación RSA). Como esto
   * es un guard frontend cosmético, confiamos en que el JWT viene del
   * iframe de Google. Para verificación real → backend.
   */
  function parseJwt(token) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const json = decodeURIComponent(
        atob(base64).split("").map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join("")
      );
      return JSON.parse(json);
    } catch (_) { return null; }
  }

  function onGoogleCredential(response) {
    const payload = parseJwt(response.credential);
    if (!payload || !payload.email) {
      toast(state.lang === "es" ? "Error verificando identidad" : "Identity verification error");
      return;
    }
    if (!payload.email_verified) {
      toast(state.lang === "es" ? "Email no verificado en Google" : "Email not verified at Google");
      return;
    }
    if (!ADMIN_EMAILS.includes(payload.email)) {
      toast(state.lang === "es"
        ? `Email ${payload.email} no autorizado como admin`
        : `Email ${payload.email} not authorized as admin`);
      return;
    }
    currentUser = {
      email: payload.email,
      name: payload.name || payload.email,
      picture: payload.picture || "",
      exp: Date.now() + 12 * 60 * 60 * 1000 // 12h
    };
    persistAuth(currentUser);
    updateAuthUI();
    closeLoginOverlay();
    toast(state.lang === "es" ? `Bienvenido, ${currentUser.name}` : `Welcome, ${currentUser.name}`);
  }

  function initGoogleSignIn() {
    const slot = document.getElementById("googleSignInBtn");
    if (!slot) return;
    if (!window.google || !window.google.accounts || !window.google.accounts.id) {
      // GIS aún no cargó — reintentar
      return setTimeout(initGoogleSignIn, 500);
    }
    if (!GOOGLE_CLIENT_ID) {
      // Magic link auth · sin contraseña. El admin recibe un email,
      // hace click, y entra directo al dashboard.
      slot.innerHTML = `
        <div id="magicLinkUI" class="supa-login">
          <div class="supa-login__icon" aria-hidden="true">✨</div>
          <h3 class="supa-login__title">${state.lang === "es" ? "Entrar al dashboard" : "Enter the dashboard"}</h3>
          <p class="supa-login__lead">${state.lang === "es"
            ? "Te enviamos un link mágico a tu email. Hacé click y entrás directo, sin contraseña."
            : "We send a magic link to your inbox. Click it and you're in — no password needed."}</p>
          <form id="magicLinkForm" class="supa-login__form">
            <label class="field">
              <small>${state.lang === "es" ? "Tu email de admin" : "Your admin email"}</small>
              <input type="email" name="email" required placeholder="info@capitan-beto.com"
                     autocomplete="username" inputmode="email" autocapitalize="off" spellcheck="false" />
            </label>
            <button type="submit" class="btn btn--primary" style="width:100%;justify-content:center">
              ✉️ ${state.lang === "es" ? "Enviarme el link mágico" : "Send me the magic link"}
            </button>
          </form>
          <small class="supa-login__note">
            ${state.lang === "es"
              ? "Sólo los emails autorizados como admin reciben el link."
              : "Only authorized admin emails receive the link."}
          </small>
        </div>
        <div id="magicLinkSent" class="supa-login supa-login--sent" hidden>
          <div class="supa-login__icon" aria-hidden="true">📬</div>
          <h3 class="supa-login__title">${state.lang === "es" ? "¡Revisá tu email!" : "Check your inbox!"}</h3>
          <p class="supa-login__lead" id="magicLinkSentMsg"></p>
          <small class="supa-login__note">
            ${state.lang === "es"
              ? "Si no ves el email en 1-2 min, revisá la carpeta de Spam. Usá el botón de abajo para volver."
              : "If you don't see the email in 1-2 min, check your Spam folder. Use the button below to go back."}
          </small>
        </div>`;
      const form = slot.querySelector("#magicLinkForm");
      const sentDiv = slot.querySelector("#magicLinkSent");
      const inputUI = slot.querySelector("#magicLinkUI");
      const sentMsg = slot.querySelector("#magicLinkSentMsg");

      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const btn = form.querySelector("button[type='submit']");
        const email = form.email.value.trim().toLowerCase();
        if (!ADMIN_EMAILS.includes(email)) {
          toast(state.lang === "es" ? "Email no autorizado como admin" : "Email not authorized");
          return;
        }
        if (!window.cbBackend || !window.cbBackend.signInWithMagicLink) {
          toast("Backend no disponible");
          return;
        }
        const originalLabel = btn.textContent;
        btn.disabled = true;
        btn.textContent = state.lang === "es" ? "Enviando…" : "Sending…";
        try {
          await window.cbBackend.signInWithMagicLink(email);
          sentMsg.textContent = state.lang === "es"
            ? `Te enviamos un link a ${email}. Hacé click ahí y entrás al dashboard automáticamente.`
            : `We sent a link to ${email}. Click it and you'll land on the dashboard.`;
          inputUI.hidden = true;
          sentDiv.hidden = false;
        } catch (err) {
          console.warn("magic link failed", err);
          const msg = (err && err.message) || "";
          let userMsg;
          if (/rate limit|over_email/i.test(msg)) {
            userMsg = state.lang === "es"
              ? "⏱ Demasiados intentos. Esperá 1 hora o configurá SMTP propio en Supabase."
              : "⏱ Too many attempts. Wait 1 hour or set up custom SMTP in Supabase.";
          } else if (/not.?found|user_not_found|create_user/i.test(msg)) {
            userMsg = state.lang === "es"
              ? "Ese email no está en la lista de admins."
              : "That email is not in the admin allowlist.";
          } else {
            userMsg = state.lang === "es"
              ? "Error enviando el link. Verificá el email."
              : "Error sending the link. Check the email.";
          }
          toast(userMsg);
        } finally {
          btn.disabled = false;
          btn.textContent = originalLabel;
        }
      });

      return;
    }
    try {
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: onGoogleCredential,
        auto_select: false,
        cancel_on_tap_outside: true
      });
      google.accounts.id.renderButton(slot, {
        theme: "outline",
        size: "large",
        type: "standard",
        shape: "pill",
        text: "signin_with",
        logo_alignment: "left"
      });
    } catch (e) {
      console.warn("Google Sign-In init failed:", e);
    }
  }

  function openLoginOverlay() {
    const ov = document.getElementById("loginOverlay");
    if (!ov) return;
    ov.classList.add("is-open");
    ov.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");
    document.body.style.overflow = "hidden";
    initGoogleSignIn();
  }
  function closeLoginOverlay() {
    const ov = document.getElementById("loginOverlay");
    if (!ov) return;
    ov.classList.remove("is-open");
    ov.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-locked");
    document.body.style.overflow = "";
  }

  function updateAuthUI() {
    const pill = document.getElementById("userPill");
    if (!pill) return;
    if (isAuthed()) {
      pill.hidden = false;
      const av = document.getElementById("userPillAvatar");
      const nm = document.getElementById("userPillName");
      const em = document.getElementById("userPillEmail");
      if (av) {
        if (currentUser.picture) { av.src = currentUser.picture; av.style.display = ""; }
        else { av.style.display = "none"; }
      }
      if (nm) nm.textContent = currentUser.name;
      if (em) em.textContent = currentUser.email;
      document.body.setAttribute("data-auth", "true");
    } else {
      pill.hidden = true;
      document.body.removeAttribute("data-auth");
    }
  }

  function logout() {
    if (!confirm("¿Cerrar sesión?")) return;
    clearAuth();
    if (window.cbBackend && window.cbBackend.signOut) {
      window.cbBackend.signOut().catch(() => {});
    }
    updateAuthUI();
    setView("public");
    toast("Sesión cerrada");
  }

  // Guard: cuando intentás entrar al dashboard sin estar logueado,
  // abrimos el overlay y bloqueamos el render del backoffice.
  function authGuardForView(view) {
    if (view !== "dashboard") return true;
    // Doble check: localStorage auth + sesión real en Supabase
    const hasLocal = isAuthed();
    const hasBackend = !!(window.cbBackend && window.cbBackend.getSession && window.cbBackend.getSession());
    if (!hasLocal || !hasBackend) {
      // Sin sesión real → limpiar cualquier estado local falso y pedir login
      try { clearAuth(); } catch (_) {}
      openLoginOverlay();
      return false;
    }
    return true;
  }

  function bindAuth() {
    document.getElementById("logoutBtn")?.addEventListener("click", logout);
    // Un solo botón para volver: "← Volver al sitio público"
    document.getElementById("loginCloseBtn")?.addEventListener("click", () => {
      closeLoginOverlay();
      setView("public");
    });
  }


  // Esquema de campos editables. Cada uno tiene un path,
  // un selector (CSS) y el label/tipo para el editor del dashboard.
  const CONTENT_SCHEMA = {
    hero: {
      label: "Hero",
      icon: "🎬",
      fields: [
        { path: "hero.pill",     label: "Píldora superior",  type: "text",     selector: '[data-content="hero.pill"]' },
        { path: "hero.title1",   label: "Título · línea 1",  type: "text",     selector: '[data-content="hero.title1"]' },
        { path: "hero.title2",   label: "Título · línea 2 (gold)", type: "text", selector: '[data-content="hero.title2"]' },
        { path: "hero.subtitle", label: "Subtítulo",         type: "textarea", selector: '[data-content="hero.subtitle"]' },
        { path: "hero.live",     label: "Banner promo LIVE", type: "text",     selector: '[data-content="hero.live"]' }
      ]
    },
    crew: {
      label: "The Crew",
      icon: "👥",
      fields: [
        { path: "crew.eyebrow",  label: "Eyebrow",     type: "text",     selector: '[data-content="crew.eyebrow"]' },
        { path: "crew.title",    label: "Título",      type: "text",     selector: '[data-content="crew.title"]' },
        { path: "crew.lead",     label: "Lead",        type: "textarea", selector: '[data-content="crew.lead"]' },
        { path: "crew.cap1",     label: "Caption foto 1", type: "text", selector: '[data-content="crew.cap1"]' },
        { path: "crew.cap2",     label: "Caption foto 2", type: "text", selector: '[data-content="crew.cap2"]' },
        { path: "crew.roleUni",  label: "Rol",         type: "text",     selector: '[data-content="crew.roleUni"]' },
        { path: "crew.nameUni",  label: "Nombre",      type: "text",     selector: '[data-content="crew.nameUni"]' },
        { path: "crew.bioUni",   label: "Bio",         type: "longtext", selector: '[data-content="crew.bioUni"]' },
        { path: "crew.sigUni",   label: "Firma / cita",type: "textarea", selector: '[data-content="crew.sigUni"]' }
      ]
    },
    pet: {
      label: "Pet-Friendly",
      icon: "🐾",
      fields: [
        { path: "pet.eyebrow",  label: "Eyebrow",     type: "text",     selector: '[data-content="pet.eyebrow"]' },
        { path: "pet.title",    label: "Título",      type: "text",     selector: '[data-content="pet.title"]' },
        { path: "pet.lead",     label: "Texto",       type: "longtext", selector: '[data-content="pet.lead"]' },
        { path: "pet.badge",    label: "Badge foto",  type: "text",     selector: '[data-content="pet.badge"]' },
        { path: "pet.c1.t",     label: "Card 1 · Título", type: "text", selector: '[data-content="pet.c1.t"]' },
        { path: "pet.c1.d",     label: "Card 1 · Texto",  type: "textarea", selector: '[data-content="pet.c1.d"]' },
        { path: "pet.c2.t",     label: "Card 2 · Título", type: "text", selector: '[data-content="pet.c2.t"]' },
        { path: "pet.c2.d",     label: "Card 2 · Texto",  type: "textarea", selector: '[data-content="pet.c2.d"]' },
        { path: "pet.c3.t",     label: "Card 3 · Título", type: "text", selector: '[data-content="pet.c3.t"]' },
        { path: "pet.c3.d",     label: "Card 3 · Texto",  type: "textarea", selector: '[data-content="pet.c3.d"]' },
        { path: "pet.c4.t",     label: "Card 4 · Título", type: "text", selector: '[data-content="pet.c4.t"]' },
        { path: "pet.c4.d",     label: "Card 4 · Texto",  type: "textarea", selector: '[data-content="pet.c4.d"]' },
        { path: "pet.cta.t",    label: "CTA · Título",    type: "text", selector: '[data-content="pet.cta.t"]' },
        { path: "pet.cta.d",    label: "CTA · Texto",     type: "textarea", selector: '[data-content="pet.cta.d"]' },
        { path: "pet.cta.btn",  label: "CTA · Botón",     type: "text", selector: '[data-content="pet.cta.btn"]' }
      ]
    },
    bpic: {
      label: "Beto's Pic",
      icon: "📸",
      fields: [
        { path: "bpic.eyebrow", label: "Eyebrow",  type: "text",     selector: '[data-content="bpic.eyebrow"]' },
        { path: "bpic.title",   label: "Título (admite HTML <em>)", type: "text", selector: '[data-content="bpic.title"]' },
        { path: "bpic.lead",    label: "Lead",     type: "longtext", selector: '[data-content="bpic.lead"]' }
      ]
    },
    marquee: {
      label: "Marquee dorado",
      icon: "✨",
      fields: [
        { path: "marquee.phrases", label: "Frases (una por línea)", type: "longtext", selector: null, transform: "lines" }
      ]
    },
    contact: {
      label: "Contacto",
      icon: "📍",
      fields: [
        { path: "contact.title", label: "Título",  type: "text",     selector: '[data-content="contact.title"]' },
        { path: "contact.lead",  label: "Texto",   type: "longtext", selector: '[data-content="contact.lead"]' }
      ]
    }
  };

  function loadContent() {
    try { contentStore = JSON.parse(localStorage.getItem(CONTENT_KEY) || "{}"); }
    catch (_) { contentStore = {}; }
  }
  function persistContent() {
    try { localStorage.setItem(CONTENT_KEY, JSON.stringify(contentStore)); }
    catch (_) {}
  }
  function getContent(path, fallback) {
    const parts = path.split(".");
    let cur = contentStore;
    for (const p of parts) {
      if (!cur || typeof cur !== "object") return fallback;
      cur = cur[p];
    }
    return cur != null && cur !== "" ? cur : fallback;
  }
  function setContent(path, value) {
    const parts = path.split(".");
    let cur = contentStore;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!cur[parts[i]] || typeof cur[parts[i]] !== "object") cur[parts[i]] = {};
      cur = cur[parts[i]];
    }
    cur[parts[parts.length - 1]] = value;
    persistContent();
  }
  function resetContent(section) {
    delete contentStore[section];
    persistContent();
    applyContentToDOM();
  }

  /**
   * SECURITY · Sanitize HTML allowed in admin content fields.
   * Solo permite <em>, <strong>, <br>, <span>. Cualquier otro tag/atributo se elimina.
   * Esto previene XSS si un admin pega HTML malicioso o si la sesión es comprometida.
   */
  function sanitizeAdminHTML(html) {
    const TEMPLATE = document.createElement("template");
    TEMPLATE.innerHTML = String(html);
    const ALLOWED_TAGS = new Set(["EM", "STRONG", "BR", "SPAN", "B", "I"]);
    const walk = (node) => {
      const children = Array.from(node.childNodes);
      children.forEach((c) => {
        if (c.nodeType === 1) { // ELEMENT
          if (!ALLOWED_TAGS.has(c.tagName)) {
            // Reemplazar el elemento por su texto
            const text = document.createTextNode(c.textContent || "");
            c.parentNode.replaceChild(text, c);
          } else {
            // Quitar TODOS los atributos (incluidos eventos)
            Array.from(c.attributes).forEach((a) => c.removeAttribute(a.name));
            walk(c);
          }
        } else if (c.nodeType === 8) { // COMMENT
          c.remove();
        }
      });
    };
    walk(TEMPLATE.content);
    return TEMPLATE.innerHTML;
  }

  function applyContentToDOM() {
    // 1. Aplicar campos con selector
    Object.values(CONTENT_SCHEMA).forEach((section) => {
      section.fields.forEach((f) => {
        if (!f.selector) return;
        const els = document.querySelectorAll(f.selector);
        const val = getContent(f.path, null);
        if (val == null) return;
        els.forEach((el) => {
          if (/<[a-z]/i.test(val)) el.innerHTML = sanitizeAdminHTML(val);
          else el.textContent = val;
        });
      });
    });
    // 2. Aplicar marquee phrases si existen
    const phrases = getContent("marquee.phrases", null);
    if (phrases) {
      const list = String(phrases).split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
      if (list.length) renderMarquee(list);
    }
  }

  function renderMarquee(phrases) {
    const track = document.querySelector(".marquee__track");
    if (!track) return;
    const parts = [];
    // duplicar para loop continuo
    [...phrases, ...phrases].forEach((p, i, arr) => {
      parts.push(`<span class="marquee__item">${escapeHtml(p)}</span>`);
      if (i < arr.length - 1) parts.push(`<span class="marquee__sep">✦</span>`);
    });
    track.innerHTML = parts.join("");
  }

  /* =====================================================
     #BetosPic WALL · uploader cliente + persistencia
     ===================================================== */
  const BPIC_KEY = "cb_bpic_wall_v1";
  let bpicStore = [];
  let bpicPendingDataURL = null;

  function loadBpicWall() {
    try {
      const raw = localStorage.getItem(BPIC_KEY);
      if (raw) bpicStore = JSON.parse(raw);
    } catch (_) { bpicStore = []; }
    renderBpicWall();
  }
  function persistBpicWall() {
    safeSetItem(BPIC_KEY, JSON.stringify(bpicStore));
  }
  function renderBpicWall() {
    const wall = $("#bpicWall");
    const count = $("#bpicCount");
    if (!wall) return;
    if (count) count.textContent = bpicStore.length;
    if (bpicStore.length === 0) {
      wall.innerHTML = `<div class="bpic-empty">${state.lang === "es" ? "Aún nadie subió su foto. ¡Sé el primero!" : "No photos yet. Be the first!"}</div>`;
      return;
    }
    wall.innerHTML = bpicStore.map((p, i) => {
      const date = new Date(p.ts).toLocaleDateString(state.lang === "es" ? "es-ES" : "en-GB", { day: "numeric", month: "short" });
      const liked = p.likedBy && p.likedBy.includes("self");
      return `
        <article class="bpic-card" data-bpic-idx="${i}">
          <div class="bpic-card__img">
            <img src="${p.src}" alt="${escapeHtml(p.name || "Beto's Pic")}" loading="lazy" />
          </div>
          <button class="bpic-card__like ${liked ? "is-liked" : ""}" data-bpic-like="${i}" aria-label="Like">${liked ? "♥" : "♡"}</button>
          ${(p.likes || 0) > 0 ? `<span class="bpic-card__like-count">${p.likes}</span>` : ""}
          <div class="bpic-card__body">
            <div class="bpic-card__author">
              <strong>${escapeHtml(p.name || "Anónimo")}</strong>
              ${p.handle ? `<span class="bpic-card__handle">${escapeHtml(p.handle)}</span>` : ""}
            </div>
            ${p.caption ? `<p class="bpic-card__caption">${escapeHtml(p.caption)}</p>` : ""}
            <span class="bpic-card__date">${date}</span>
          </div>
        </article>`;
    }).join("");
  }

  function openBpicModal() {
    const modal = $("#bpicModal");
    if (!modal) return;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    resetBpicForm();
  }
  function closeBpicModal() {
    const modal = $("#bpicModal");
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  function resetBpicForm() {
    bpicPendingDataURL = null;
    const form = $("#bpicForm");
    if (form) form.reset();
    const drop = $("#bpicDrop");
    const preview = $("#bpicPreview");
    if (drop) drop.classList.remove("has-image");
    if (preview) {
      preview.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="3"/>
          <circle cx="9" cy="11" r="2"/>
          <path d="M21 17l-5-5-9 9"/>
        </svg>
        <strong>${t("bpic.drop")}</strong>
        <small>${t("bpic.dropSub")}</small>`;
    }
  }
  function handleBpicFile(file) {
    if (!file) return;
    if (!isImageFile(file)) {
      toast(state.lang === "es" ? "Tiene que ser una imagen" : "Must be an image");
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      toast(state.lang === "es" ? "Foto demasiado grande (máx 25 MB)" : "Photo too large (max 25 MB)");
      return;
    }
    readImageToDataURL(file).then(({ dataURL }) => {
      bpicPendingDataURL = dataURL;
      const drop = $("#bpicDrop");
      const preview = $("#bpicPreview");
      if (drop) drop.classList.add("has-image");
      if (preview) {
        preview.innerHTML = `
          <div class="bpic-drop__thumb" style="background-image:url('${bpicPendingDataURL}')"></div>
          <strong>${state.lang === "es" ? "Foto lista. Completa abajo y publica." : "Photo ready. Fill out below and publish."}</strong>`;
      }
    }).catch(() => {
      toast(state.lang === "es" ? "No se pudo procesar la imagen" : "Could not process the image");
    });
  }
  function publishBpic(formData) {
    if (!bpicPendingDataURL) {
      toast(state.lang === "es" ? "Falta seleccionar una foto" : "Pick a photo first");
      return false;
    }
    const handle = (formData.get("bpicHandle") || "").toString().trim();
    const guestName = (formData.get("bpicName") || "").toString().trim() || (state.lang === "es" ? "Anónimo" : "Anonymous");
    const cleanHandle = handle ? (handle.startsWith("@") ? handle : "@" + handle) : "";
    const caption = (formData.get("bpicCaption") || "").toString().trim();

    // Local store (cache + offline fallback)
    bpicStore.unshift({
      id: "p" + Date.now() + "_" + Math.random().toString(36).slice(2, 6),
      src: bpicPendingDataURL,
      name: guestName,
      handle: cleanHandle,
      caption,
      ts: Date.now(),
      likes: 0,
      likedBy: []
    });
    persistBpicWall();
    renderBpicWall();

    // Backend → guarda en Supabase como pending
    if (window.cbBackend && window.cbBackend.uploadBpicPhoto) {
      window.cbBackend.uploadBpicPhoto({
        dataURL: bpicPendingDataURL,
        guestName,
        igHandle: cleanHandle,
        caption
      }).then(() => {
        toast(state.lang === "es"
          ? "¡Gracias! Tu foto pasa por moderación antes de ir al muro 📸"
          : "Thanks! Your photo goes through moderation before hitting the wall 📸");
      }).catch((e) => console.warn("backend bpic upload failed", e));
    }
    return true;
  }
  function bindBpic() {
    $("#bpicOpenUpload")?.addEventListener("click", openBpicModal);
    $$("[data-bpic-close]").forEach((b) => b.addEventListener("click", closeBpicModal));

    const drop = $("#bpicDrop");
    const file = $("#bpicFile");
    if (drop && file) {
      drop.addEventListener("click", (e) => {
        if (e.target.tagName === "INPUT") return;
        file.click();
      });
      drop.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); file.click(); }
      });
      file.addEventListener("change", (e) => handleBpicFile(e.target.files[0]));

      ["dragenter", "dragover"].forEach((ev) => drop.addEventListener(ev, (e) => {
        e.preventDefault();
        drop.classList.add("is-drag");
      }));
      ["dragleave", "drop"].forEach((ev) => drop.addEventListener(ev, (e) => {
        e.preventDefault();
        drop.classList.remove("is-drag");
      }));
      drop.addEventListener("drop", (e) => {
        const f = e.dataTransfer?.files?.[0];
        if (f) handleBpicFile(f);
      });
    }

    $("#bpicForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const form = e.target;
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const ok = publishBpic(data);
      if (ok) {
        toast(state.lang === "es" ? "¡Foto publicada en el muro!" : "Photo published on the wall!");
        setTimeout(closeBpicModal, 700);
      }
    });

    // Likes en el wall
    $("#bpicWall")?.addEventListener("click", (e) => {
      const likeBtn = e.target.closest("[data-bpic-like]");
      if (!likeBtn) return;
      const idx = parseInt(likeBtn.getAttribute("data-bpic-like"), 10);
      const p = bpicStore[idx];
      if (!p) return;
      p.likedBy = p.likedBy || [];
      if (p.likedBy.includes("self")) {
        p.likedBy = p.likedBy.filter((x) => x !== "self");
        p.likes = Math.max(0, (p.likes || 1) - 1);
      } else {
        p.likedBy.push("self");
        p.likes = (p.likes || 0) + 1;
      }
      persistBpicWall();
      renderBpicWall();
    });
  }

  /* =====================================================
     COOKIE CONSENT (GDPR)
     ===================================================== */
  const DEFAULT_CONSENT = { necesarias: true, funcionales: false, analiticas: false, marketing: false, ts: 0 };
  let cookieConsent = { ...DEFAULT_CONSENT };

  function loadCookieConsent() {
    try {
      const raw = localStorage.getItem(COOKIE_KEY);
      if (!raw) return false;
      const obj = JSON.parse(raw);
      // Expira a los 12 meses
      const oneYear = 365 * 24 * 60 * 60 * 1000;
      if (obj.ts && Date.now() - obj.ts < oneYear) {
        cookieConsent = { ...DEFAULT_CONSENT, ...obj };
        return true;
      }
    } catch (_) {}
    return false;
  }
  function persistCookieConsent() {
    cookieConsent.ts = Date.now();
    try { localStorage.setItem(COOKIE_KEY, JSON.stringify(cookieConsent)); } catch (_) {}
  }
  function showCookieBanner() {
    const banner = document.getElementById("cookieBanner");
    if (!banner) return;
    banner.hidden = false;
    // forzar reflow para que la transición arranque
    void banner.offsetWidth;
    banner.classList.add("is-visible");
    banner.classList.remove("is-leaving");
  }
  function hideCookieBanner() {
    const banner = document.getElementById("cookieBanner");
    if (!banner) return;
    banner.classList.remove("is-visible");
    banner.classList.add("is-leaving");
    // tras la animación, hide del DOM para que no atrape clicks
    setTimeout(() => {
      banner.hidden = true;
      banner.classList.remove("is-leaving");
    }, 600);
  }
  function openCookieModal() {
    const m = document.getElementById("cookieModal");
    if (!m) return;
    // pre-fill toggles
    document.getElementById("cookieFunc").checked = !!cookieConsent.funcionales;
    document.getElementById("cookieAna").checked = !!cookieConsent.analiticas;
    document.getElementById("cookieMkt").checked = !!cookieConsent.marketing;
    m.classList.add("is-open");
    m.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeCookieModal() {
    const m = document.getElementById("cookieModal");
    if (!m) return;
    m.classList.remove("is-open");
    m.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  function bindCookieConsent() {
    document.getElementById("cookieAccept")?.addEventListener("click", () => {
      cookieConsent = { necesarias: true, funcionales: true, analiticas: true, marketing: true };
      persistCookieConsent();
      hideCookieBanner();
      toast("Cookies aceptadas");
    });
    document.getElementById("cookieMinimal")?.addEventListener("click", () => {
      cookieConsent = { necesarias: true, funcionales: false, analiticas: false, marketing: false };
      persistCookieConsent();
      hideCookieBanner();
      toast("Solo cookies necesarias");
    });
    document.getElementById("cookieConfig")?.addEventListener("click", openCookieModal);
    document.getElementById("cookieMinimalModal")?.addEventListener("click", () => {
      cookieConsent = { necesarias: true, funcionales: false, analiticas: false, marketing: false };
      persistCookieConsent();
      closeCookieModal();
      hideCookieBanner();
      toast("Cookies rechazadas (solo necesarias)");
    });
    document.getElementById("cookieSavePrefs")?.addEventListener("click", () => {
      cookieConsent = {
        necesarias: true,
        funcionales: document.getElementById("cookieFunc").checked,
        analiticas: document.getElementById("cookieAna").checked,
        marketing: document.getElementById("cookieMkt").checked
      };
      persistCookieConsent();
      closeCookieModal();
      hideCookieBanner();
      toast("Preferencias guardadas");
    });
    document.querySelectorAll("[data-cookie-close]").forEach((b) =>
      b.addEventListener("click", closeCookieModal));
    document.getElementById("footerCookieReopen")?.addEventListener("click", openCookieModal);

    // Acceso admin discreto desde el footer → abre el login overlay
    document.getElementById("footerAdminLink")?.addEventListener("click", () => {
      if (typeof openLoginOverlay === "function") openLoginOverlay();
    });
  }

  /* =====================================================
     LEGAL MODALS (Aviso, Privacidad, Cookies, Términos)
     ===================================================== */
  function getLegalContent(kind) {
    const today = new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
    const TEMPLATES = {
      aviso: `
        <h2>Aviso Legal</h2>
        <p>En cumplimiento de la <strong>Ley 34/2002, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE)</strong>, se exponen los datos identificativos del titular del sitio web.</p>
        <h3>Titular</h3>
        <ul>
          <li><strong>Titulares:</strong> Matías &amp; Natalia (alias "la Polaca") en régimen de autónomos</li>
          <li><strong>NIF:</strong> <em>pendiente — se actualiza desde el dashboard antes del go-live</em></li>
          <li><strong>Dirección:</strong> Calle de los Hidalgos, Madrid</li>
          <li><strong>Email:</strong> capitanbetomadrid@gmail.com</li>
          <li><strong>Teléfono:</strong> +34 611 854 380</li>
          <li><strong>Registro Mercantil:</strong> Madrid, Tomo ____, Folio ____, Hoja ____</li>
        </ul>
        <h3>Objeto</h3>
        <p>El presente sitio web tiene por objeto presentar el bar de tapas <em>Capitán Beto · Gastro Taberna</em>, facilitar reservas de mesa, mostrar la carta y ofrecer un canal de comunicación con los clientes.</p>
        <h3>Condiciones de uso</h3>
        <p>El acceso al sitio es gratuito. El usuario se compromete a hacer un uso adecuado de los contenidos y servicios y a no emplearlos para actividades ilícitas o lesivas contra terceros.</p>
        <h3>Propiedad intelectual</h3>
        <p>Todos los contenidos del sitio (textos, fotografías, logotipos, código) son propiedad de Capitán Beto (Matías &amp; Natalia · autónomos) o de sus respectivos autores, y están protegidos por la normativa nacional e internacional sobre propiedad intelectual e industrial.</p>
        <h3>Legislación aplicable y jurisdicción</h3>
        <p>El presente aviso legal se rige por la legislación española. Para cualquier controversia, las partes se someten a los Juzgados y Tribunales de Madrid.</p>
        <small>Última actualización: ${today}</small>
      `,
      privacy: `
        <h2>Política de Privacidad</h2>
        <p>De conformidad con el <strong>Reglamento (UE) 2016/679 (RGPD)</strong> y la <strong>LOPDGDD 3/2018</strong>, te informamos sobre el tratamiento de tus datos personales.</p>
        <h3>Responsable del tratamiento</h3>
        <ul>
          <li><strong>Responsable:</strong> Capitán Beto (Matías &amp; Natalia · autónomos) (Matías y Natalia "la Polaca")</li>
          <li><strong>Email de contacto:</strong> capitanbetomadrid@gmail.com</li>
        </ul>
        <h3>Finalidades</h3>
        <ul>
          <li><strong>Reservas:</strong> Gestionar tu reserva de mesa.</li>
          <li><strong>Comunicaciones comerciales:</strong> Enviarte promos, eventos y descuentos de cumpleaños — <em>solo si has dado tu consentimiento</em>.</li>
          <li><strong>Atención al cliente:</strong> Responder consultas por email, WhatsApp o Instagram.</li>
          <li><strong>Mejora del servicio:</strong> Estadísticas agregadas de uso del sitio.</li>
        </ul>
        <h3>Base jurídica</h3>
        <p>Ejecución de un contrato (reservas), consentimiento explícito (marketing), e interés legítimo (atención al cliente y mejora del servicio).</p>
        <h3>Plazo de conservación</h3>
        <p>Datos de reservas: 6 meses tras la visita. Datos para marketing: hasta que retires el consentimiento. Datos contables: 6 años (obligación fiscal).</p>
        <h3>Destinatarios</h3>
        <p>No cedemos tus datos a terceros salvo obligación legal. Usamos los siguientes proveedores tecnológicos: <strong>Google</strong> (Calendar para reservas, Sign-In para administradores), <strong>FormSubmit</strong> (envío de formularios por email), <strong>Meta</strong> (WhatsApp Business).</p>
        <h3>Derechos</h3>
        <p>Podés ejercer en cualquier momento los derechos de:</p>
        <ul>
          <li><strong>Acceso, rectificación y supresión</strong> de tus datos</li>
          <li><strong>Oposición y limitación</strong> del tratamiento</li>
          <li><strong>Portabilidad</strong> de tus datos</li>
          <li><strong>Retirar el consentimiento</strong> en cualquier momento</li>
          <li>Presentar <strong>reclamación ante la AEPD</strong> (www.aepd.es)</li>
        </ul>
        <p>Para ejercer tus derechos, escribinos a <a href="mailto:capitanbetomadrid@gmail.com">capitanbetomadrid@gmail.com</a> indicando el derecho que querés ejercer.</p>
        <small>Última actualización: ${today}</small>
      `,
      cookies: `
        <h2>Política de Cookies</h2>
        <p>Este sitio utiliza cookies y tecnologías equivalentes (localStorage) para funcionar correctamente y mejorar tu experiencia.</p>
        <h3>¿Qué son las cookies?</h3>
        <p>Pequeños archivos que el sitio guarda en tu navegador para recordar tus preferencias entre visitas.</p>
        <h3>Categorías que usamos</h3>
        <ul>
          <li><strong>Necesarias (siempre activas):</strong> idioma, sesión, consentimiento de cookies. Sin estas, el sitio no funciona.</li>
          <li><strong>Funcionales (opcional):</strong> guardar fotos del muro, reservas locales, configuraciones del dashboard.</li>
          <li><strong>Analíticas (opcional):</strong> datos agregados de uso para mejorar la web. Sin identificación personal.</li>
          <li><strong>Marketing (opcional):</strong> personalizar promos si te registrás en "Mi cuenta".</li>
        </ul>
        <h3>Gestión del consentimiento</h3>
        <p>Podés cambiar tus preferencias en cualquier momento desde el botón <strong>⚙️ Configurar cookies</strong> en el footer.</p>
        <h3>Cómo desactivarlas en tu navegador</h3>
        <p>Cada navegador permite borrar o bloquear cookies. Consultá la ayuda de tu navegador (Chrome, Safari, Firefox, Edge).</p>
        <h3>Cookies de terceros</h3>
        <p>Usamos servicios externos que pueden instalar sus propias cookies: <strong>Google Fonts</strong>, <strong>Google Sign-In</strong>, <strong>Google Drive</strong> (galerías), <strong>Instagram</strong> (links externos).</p>
        <small>Última actualización: ${today}</small>
      `,
      terms: `
        <h2>Términos y Condiciones</h2>
        <h3>1. Aceptación</h3>
        <p>Al utilizar este sitio web aceptás estos términos. Si no estás de acuerdo, te pedimos no usar el servicio.</p>
        <h3>2. Reservas</h3>
        <p>Las reservas hechas desde la web son orientativas y se confirman por WhatsApp o email. Capitán Beto se reserva el derecho de no confirmar una reserva si no hay disponibilidad.</p>
        <h3>3. Comportamiento en el local</h3>
        <p>Solicitamos respeto al personal, al resto de comensales y al espacio. Capitán Beto puede solicitar a un cliente abandonar el local en caso de comportamiento inapropiado.</p>
        <h3>4. Mascotas</h3>
        <p>Aceptamos mascotas en la terraza y zonas indicadas, siempre que vayan con correa y bajo supervisión del dueño. No se permite que las mascotas suban a las mesas ni se acerquen a otros clientes sin su consentimiento.</p>
        <h3>5. Concurso #BetosPic</h3>
        <p>Las fotos subidas al muro pueden ser republicadas en el Instagram de Capitán Beto. Al subir una foto, el usuario acepta esta condición. La elección del ganador mensual es decisión exclusiva del bar.</p>
        <h3>6. Limitación de responsabilidad</h3>
        <p>Capitán Beto no se hace responsable de daños indirectos derivados del uso del sitio. Hacemos lo mejor para que la web funcione, pero pueden producirse interrupciones por mantenimiento o causas técnicas.</p>
        <h3>7. Modificaciones</h3>
        <p>Nos reservamos el derecho a modificar estos términos. La fecha de última actualización se indica al pie de este documento.</p>
        <h3>8. Ley aplicable</h3>
        <p>Estos términos se rigen por la legislación española. Para cualquier disputa, las partes se someten a los Juzgados y Tribunales de Madrid.</p>
        <small>Última actualización: ${today}</small>
      `
    };
    return TEMPLATES[kind] || "<p>Documento no disponible.</p>";
  }
  function openLegalModal(kind) {
    const m = document.getElementById("legalModal");
    const c = document.getElementById("legalContent");
    if (!m || !c) return;
    c.innerHTML = getLegalContent(kind);
    m.classList.add("is-open");
    m.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    c.scrollTop = 0;
  }
  function closeLegalModal() {
    const m = document.getElementById("legalModal");
    if (!m) return;
    m.classList.remove("is-open");
    m.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  function bindLegal() {
    document.addEventListener("click", (e) => {
      const open = e.target.closest("[data-open-legal]");
      if (open) {
        e.preventDefault();
        openLegalModal(open.getAttribute("data-open-legal"));
      }
      const close = e.target.closest("[data-legal-close]");
      if (close) closeLegalModal();
    });
  }

  /* =====================================================
     CUSTOMER AUTH (Mi cuenta) · captura de leads
     ===================================================== */
  let customers = [];
  let currentCustomer = null;

  function loadCustomers() {
    try { customers = JSON.parse(localStorage.getItem(CUSTOMERS_KEY) || "[]"); }
    catch (_) { customers = []; }
    try {
      const session = JSON.parse(localStorage.getItem(CUSTOMER_SESSION_KEY) || "null");
      if (session && session.email) currentCustomer = customers.find((c) => c.email === session.email) || null;
    } catch (_) {}
  }
  function persistCustomers() {
    try { localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customers)); } catch (_) {}
  }
  function persistCustomerSession() {
    try {
      if (currentCustomer) localStorage.setItem(CUSTOMER_SESSION_KEY, JSON.stringify({ email: currentCustomer.email }));
      else localStorage.removeItem(CUSTOMER_SESSION_KEY);
    } catch (_) {}
  }
  function openCustomerModal(tab) {
    const m = document.getElementById("customerModal");
    if (!m) return;
    m.classList.add("is-open");
    m.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (tab) setCustomerTab(tab);
  }
  function closeCustomerModal() {
    const m = document.getElementById("customerModal");
    if (!m) return;
    m.classList.remove("is-open");
    m.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  function setCustomerTab(tab) {
    document.querySelectorAll(".customer-tab").forEach((t) => t.classList.toggle("is-active", t.dataset.customerTab === tab));
    document.querySelectorAll(".customer-form").forEach((f) => f.classList.toggle("is-active", f.dataset.customerPanel === tab));
  }
  function updateCustomerUI() {
    const pill = document.getElementById("customerPill");
    if (!pill) return;
    if (currentCustomer) {
      pill.hidden = false;
      document.getElementById("customerPillName").textContent = currentCustomer.name;
    } else {
      pill.hidden = true;
    }
    // Actualizar badge en dashboard
    const badge = document.getElementById("dashCustCount");
    if (badge) badge.textContent = customers.length;
  }
  function signupCustomer(formData) {
    const email = (formData.get("cEmail") || "").toString().trim().toLowerCase();
    if (!email || !email.includes("@")) { toast("Email inválido"); return false; }
    if (customers.some((c) => c.email === email)) {
      toast("Ese email ya está registrado. Iniciá sesión.");
      setCustomerTab("signin");
      return false;
    }
    const prefs = formData.getAll ? formData.getAll("prefs") : [];
    const newCustomer = {
      id: "c" + Date.now(),
      ts: Date.now(),
      name: (formData.get("cName") || "").toString().trim(),
      email,
      phone: (formData.get("cPhone") || "").toString().trim(),
      birthday: (formData.get("cBirthday") || "").toString(),
      prefs,
      optEmail: !!formData.get("optEmail"),
      optWhatsapp: !!formData.get("optWhatsapp"),
      consent: !!formData.get("consent"),
      consentTs: Date.now()
    };
    customers.unshift(newCustomer);
    currentCustomer = newCustomer;
    persistCustomers();
    persistCustomerSession();
    updateCustomerUI();

    // Backend: upsert al backend para que el lead viva en la DB.
    if (window.cbBackend && window.cbBackend.upsertCustomer) {
      window.cbBackend.upsertCustomer({
        email: newCustomer.email,
        full_name: newCustomer.name,
        phone: newCustomer.phone,
        marketing_consent: !!(newCustomer.optEmail || newCustomer.optWhatsapp)
      }).catch((e) => console.warn("backend customer upsert failed", e));
    }
    return true;
  }
  function signinCustomer(email) {
    email = (email || "").trim().toLowerCase();
    const found = customers.find((c) => c.email === email);
    if (!found) { toast("Email no registrado. Creá tu cuenta primero."); return false; }
    currentCustomer = found;
    persistCustomerSession();
    updateCustomerUI();
    return true;
  }
  function logoutCustomer() {
    if (!confirm("¿Cerrar sesión?")) return;
    currentCustomer = null;
    persistCustomerSession();
    updateCustomerUI();
    toast("Sesión cerrada");
  }
  function bindCustomer() {
    document.getElementById("navOpenAccount")?.addEventListener("click", () => {
      if (currentCustomer) {
        // Si ya logueado, mostrar info / ofrecer logout
        if (confirm(`Estás logueado como ${currentCustomer.email}. ¿Cerrar sesión?`)) logoutCustomer();
      } else {
        openCustomerModal("signup");
      }
    });
    document.querySelectorAll("[data-customer-close]").forEach((b) =>
      b.addEventListener("click", closeCustomerModal));
    document.querySelectorAll(".customer-tab").forEach((t) =>
      t.addEventListener("click", () => setCustomerTab(t.dataset.customerTab)));
    document.getElementById("customerSignupForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const f = e.target;
      if (!f.reportValidity()) return;
      if (signupCustomer(new FormData(f))) {
        toast(`¡Bienvenido, ${currentCustomer.name}!`);
        setTimeout(closeCustomerModal, 800);
      }
    });
    document.getElementById("customerSigninForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const f = e.target;
      if (!f.reportValidity()) return;
      const data = new FormData(f);
      const email = data.get("cEmail");
      if (signinCustomer(email)) {
        toast(`Bienvenido de vuelta, ${currentCustomer.name}`);
        setTimeout(closeCustomerModal, 800);
      }
    });
    document.getElementById("customerLogoutBtn")?.addEventListener("click", logoutCustomer);
  }

  /* =====================================================
     DASHBOARD · Clientes panel + envío masivo
     ===================================================== */
  function renderCustomersPanel() {
    const list = document.getElementById("custList");
    const badge = document.getElementById("dashCustCount");
    if (!list) return;
    list.innerHTML = `<div class="resv-empty">${state.lang === "es" ? "Cargando clientes…" : "Loading customers…"}</div>`;

    const fromBackend = (window.cbBackend && window.cbBackend.listAllCustomers)
      ? window.cbBackend.listAllCustomers({ limit: 500 })
      : Promise.resolve([]);

    fromBackend.then((rows) => {
      // Merge backend + local por email
      const byEmail = new Map();
      rows.forEach((c) => {
        byEmail.set(c.email, {
          id: c.id,
          name: c.full_name,
          email: c.email,
          phone: c.phone,
          ts: new Date(c.first_visit_at || c.created_at || Date.now()).getTime(),
          optEmail: !!c.marketing_consent,
          optWhatsapp: !!c.marketing_consent,
          source: c.source,
          remote: true
        });
      });
      customers.forEach((c) => {
        if (!byEmail.has(c.email)) byEmail.set(c.email, c);
      });
      const all = Array.from(byEmail.values()).sort((a, b) => b.ts - a.ts);

      if (badge) badge.textContent = all.length;
      if (all.length === 0) {
        list.innerHTML = `<div class="resv-empty">${state.lang === "es" ? "Aún no hay clientes registrados." : "No customers yet."}</div>`;
        return;
      }
      list.innerHTML = all.map((c) => {
        const d = new Date(c.ts).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });
        const prefBadges = (c.prefs || []).map((p) => `<span class="cust-pref">${escapeHtml(p)}</span>`).join("");
        const channels = [];
        if (c.optEmail) channels.push('<span class="cust-ch">✉ email</span>');
        if (c.optWhatsapp) channels.push('<span class="cust-ch cust-ch--wa">⌬ WhatsApp</span>');
        const remoteBadge = c.remote ? '<span class="cust-row__remote" title="En Supabase">☁️</span>' : '';
        return `
          <div class="cust-row" data-cust-id="${c.id}" data-cust-remote="${!!c.remote}">
            <div class="cust-row__avatar">${escapeHtml((c.name || c.email || "?")[0].toUpperCase())}</div>
            <div class="cust-row__info">
              <strong>${escapeHtml(c.name || "Sin nombre")}</strong> ${remoteBadge}
              <small>${escapeHtml(c.email)}${c.phone ? " · " + escapeHtml(c.phone) : ""}</small>
              <div class="cust-row__chips">${prefBadges} ${channels.join(" ")}</div>
            </div>
            <div class="cust-row__date">${d}</div>
            <button class="cust-row__del" data-cust-del="${c.id}" aria-label="Eliminar">🗑</button>
          </div>`;
      }).join("");
    }).catch((err) => {
      console.warn("Error cargando clientes backend:", err);
      list.innerHTML = `<div class="resv-empty">${state.lang === "es" ? "Sin clientes (login admin requerido para ver Supabase)." : "No customers (admin login required)."}</div>`;
    });
  }
  function sendMassEmail(channel) {
    const targets = customers.filter((c) => channel === "email" ? c.optEmail : c.optWhatsapp);
    if (targets.length === 0) {
      toast(`Nadie con opt-in para ${channel}.`);
      return;
    }
    if (channel === "email") {
      const subject = prompt("Asunto del email:", "Promo de la semana en Capitán Beto");
      if (!subject) return;
      const body = prompt("Mensaje (texto plano):", "Hola! Esta semana tenemos:\n\n— Empanadas + Malbec por 9€\n— Provoleta + Vermut por 12€\n\n¡Te esperamos!\nMatías y la Polaca");
      if (!body) return;
      const bcc = targets.map((c) => c.email).join(",");
      const url = `mailto:?bcc=${encodeURIComponent(bcc)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = url;
    } else {
      const msg = prompt("Mensaje para WhatsApp:", "¡Hola! Tenemos novedades esta semana en Capitán Beto. ¿Te animás a pasar? +34 611 854 380");
      if (!msg) return;
      // Abre 1 WhatsApp por contacto (limitación de wa.me)
      if (!confirm(`Se abrirán ${targets.length} ventanas de WhatsApp (una por contacto). ¿Continuar?`)) return;
      targets.forEach((c, i) => {
        setTimeout(() => {
          const phone = (c.phone || "").replace(/[^0-9]/g, "");
          if (!phone) return;
          window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
        }, i * 350); // stagger para no bloquear popup blocker
      });
    }
  }
  function exportCustomersCSV() {
    if (customers.length === 0) { toast("No hay clientes para exportar."); return; }
    const headers = ["nombre", "email", "telefono", "cumple", "preferencias", "opt_email", "opt_whatsapp", "consentimiento_ts", "fecha_registro"];
    const rows = customers.map((c) => [
      c.name, c.email, c.phone, c.birthday,
      (c.prefs || []).join("|"),
      c.optEmail ? "1" : "0",
      c.optWhatsapp ? "1" : "0",
      c.consentTs ? new Date(c.consentTs).toISOString() : "",
      new Date(c.ts).toISOString()
    ]);
    const csv = [headers, ...rows].map((r) => r.map((v) => `"${String(v || "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `clientes-capitan-beto-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast("CSV exportado");
  }
  function bindCustomersPanel() {
    document.getElementById("custList")?.addEventListener("click", (e) => {
      const del = e.target.closest("[data-cust-del]");
      if (!del) return;
      const id = del.getAttribute("data-cust-del");
      if (confirm("¿Eliminar este cliente? También se borrarán sus consentimientos.")) {
        customers = customers.filter((c) => c.id !== id);
        persistCustomers();
        renderCustomersPanel();
        updateCustomerUI();
      }
    });
    document.getElementById("custSendEmail")?.addEventListener("click", () => sendMassEmail("email"));
    document.getElementById("custSendWa")?.addEventListener("click", () => sendMassEmail("whatsapp"));
    document.getElementById("custExport")?.addEventListener("click", exportCustomersCSV);
  }

  /* =====================================================
     IMAGE MANAGER · todos los assets editables desde dash
     ===================================================== */
  // Slots: cada uno con su selector (para aplicar al sitio) y default
  const IMAGE_SLOTS = [
    { id: "logo",      label: "Logo navbar",      defaultSrc: "logo.png",          selector: ".brand__logo, .sidebar__logo" },
    { id: "herocrest", label: "Crest hero",       defaultSrc: "logo.png",          selector: ".hero__crest" },
    { id: "crew0",     label: "Crew · foto 1",    defaultSrc: "crew/beto.jpg",     selector: "#crewImg0" },
    { id: "crew1",     label: "Crew · foto 2",    defaultSrc: "crew/marina.jpg",   selector: "#crewImg1" },
    { id: "mom-vinos",    label: "Momentos · Vinos",    defaultSrc: "momentos/vinos.jpg",    selector: '.section--momentos img[src="momentos/vinos.jpg"]' },
    { id: "mom-cervezas", label: "Momentos · Cervezas", defaultSrc: "momentos/cervezas.jpg", selector: '.section--momentos img[src="momentos/cervezas.jpg"]' },
    { id: "mom-cartel",   label: "Momentos · Cartel",   defaultSrc: "momentos/cartel.jpg",   selector: '.section--momentos img[src="momentos/cartel.jpg"]' },
    { id: "mom-puerta",   label: "Momentos · Puerta",   defaultSrc: "momentos/puerta.jpg",   selector: '.section--momentos img[src="momentos/puerta.jpg"]' },
    { id: "mom-interior", label: "Momentos · Interior", defaultSrc: "momentos/interior.jpg", selector: '.section--momentos img[src="momentos/interior.jpg"]' },
    { id: "mom-fachada",  label: "Momentos · Fachada",  defaultSrc: "momentos/fachada.jpg",  selector: '.section--momentos img[src="momentos/fachada.jpg"]' },
    { id: "mom-barra",    label: "Momentos · Barra",    defaultSrc: "momentos/barra.jpg",    selector: '.section--momentos img[src="momentos/barra.jpg"]' }
  ];

  let imagesStore = {};

  function loadImages() {
    try { imagesStore = JSON.parse(localStorage.getItem(IMG_KEY) || "{}"); }
    catch (_) { imagesStore = {}; }
  }
  function persistImages() {
    try { localStorage.setItem(IMG_KEY, JSON.stringify(imagesStore)); }
    catch (e) {
      // QuotaExceeded → avisar
      toast("Almacenamiento lleno. Borrá alguna imagen antes de subir otra.");
    }
  }

  function applyImageToDOM(slot, src) {
    const els = document.querySelectorAll(slot.selector);
    els.forEach((el) => {
      if (el.tagName === "IMG") el.src = src;
      else el.style.backgroundImage = `url('${src}')`;
    });
  }
  function applyAllImages() {
    IMAGE_SLOTS.forEach((slot) => {
      const stored = imagesStore[slot.id];
      if (stored) applyImageToDOM(slot, stored);
    });
  }
  function setSlotImage(slotId, dataURL) {
    imagesStore[slotId] = dataURL;
    persistImages();
    const slot = IMAGE_SLOTS.find((s) => s.id === slotId);
    if (slot) applyImageToDOM(slot, dataURL);
    renderImageManager();
  }
  function resetSlotImage(slotId) {
    delete imagesStore[slotId];
    persistImages();
    const slot = IMAGE_SLOTS.find((s) => s.id === slotId);
    if (slot) applyImageToDOM(slot, slot.defaultSrc);
    renderImageManager();
  }
  function resetAllImages() {
    if (!confirm("¿Restaurar TODAS las imágenes a sus valores originales?")) return;
    imagesStore = {};
    persistImages();
    IMAGE_SLOTS.forEach((slot) => applyImageToDOM(slot, slot.defaultSrc));
    renderImageManager();
    toast("Todas las imágenes restauradas");
  }

  function renderImageManager() {
    const grid = document.getElementById("imgManagerGrid");
    if (!grid) return;
    grid.innerHTML = IMAGE_SLOTS.map((slot) => {
      const isCustom = !!imagesStore[slot.id];
      const src = isCustom ? imagesStore[slot.id] : slot.defaultSrc;
      return `
        <div class="img-slot ${isCustom ? "is-custom" : ""}" data-img-slot="${slot.id}">
          <img src="${src}" alt="${escapeHtml(slot.label)}" loading="lazy" />
          <button class="img-slot__reset" data-img-reset="${slot.id}" aria-label="Restaurar" title="Restaurar original">↺</button>
          <div class="img-slot__overlay">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>
            <span>Click para cambiar</span>
          </div>
          <div class="img-slot__label">${escapeHtml(slot.label)}</div>
        </div>`;
    }).join("");
  }

  function bindImageManager() {
    const grid = document.getElementById("imgManagerGrid");
    if (!grid) return;
    // Crear input file oculto reutilizable
    let fileInput = document.getElementById("imgManagerFile");
    if (!fileInput) {
      fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.id = "imgManagerFile";
      fileInput.accept = "image/*";
      fileInput.hidden = true;
      document.body.appendChild(fileInput);
    }

    grid.addEventListener("click", (e) => {
      const reset = e.target.closest("[data-img-reset]");
      if (reset) {
        e.stopPropagation();
        const id = reset.getAttribute("data-img-reset");
        if (confirm(`¿Restaurar "${IMAGE_SLOTS.find(s=>s.id===id)?.label}" a su valor original?`)) {
          resetSlotImage(id);
        }
        return;
      }
      const slot = e.target.closest("[data-img-slot]");
      if (slot) {
        fileInput.dataset.targetSlot = slot.getAttribute("data-img-slot");
        fileInput.click();
      }
    });

    fileInput.addEventListener("change", (e) => {
      const slotId = fileInput.dataset.targetSlot;
      const file = e.target.files && e.target.files[0];
      fileInput.value = "";
      if (!slotId || !file) return;
      // SECURITY: validar tipo MIME + tamaño (acepta HEIC/HEIF/WebP/AVIF/TIFF)
      if (!isImageFile(file)) {
        toast("El archivo debe ser una imagen");
        return;
      }
      if (file.size > 25 * 1024 * 1024) {
        toast("Imagen muy grande (máx 25 MB)");
        return;
      }
      readImageToDataURL(file)
        .then(({ dataURL }) => { setSlotImage(slotId, dataURL); toast("Imagen actualizada"); })
        .catch(() => toast("Error leyendo el archivo"));
    });

    document.getElementById("imgResetAll")?.addEventListener("click", resetAllImages);
  }

  /* =====================================================
     DASHBOARD · Content Editor + Reservations + Wall
     ===================================================== */
  let ceActiveSection = "hero";

  function getDefaultContent(path) {
    // Lee el valor por defecto desde el i18n actual (clave matchea path)
    return I18N[state.lang][path] || "";
  }

  function renderContentEditorNav() {
    const nav = document.getElementById("contentNav");
    if (!nav) return;
    nav.innerHTML = Object.entries(CONTENT_SCHEMA).map(([key, section]) => `
      <button class="ce-tab ${key === ceActiveSection ? "is-active" : ""}" data-ce-tab="${key}" type="button">
        <span class="ce-tab__ico">${section.icon}</span>
        <span>${section.label}</span>
      </button>
    `).join("");
  }

  function renderContentEditorPanel() {
    const panel = document.getElementById("contentPanel");
    if (!panel) return;
    const section = CONTENT_SCHEMA[ceActiveSection];
    if (!section) { panel.innerHTML = ""; return; }
    const fields = section.fields.map((f) => {
      let val;
      if (f.path === "marquee.phrases") {
        val = getContent(f.path, "Atendido por sus Dueños\nSpanish Tapas\nArgentine Soul\nTapas Castizas\nSabor Argentino\nVermut de Grifo");
      } else {
        val = getContent(f.path, getDefaultContent(f.path));
      }
      const safe = String(val).replace(/"/g, "&quot;");
      const input = f.type === "longtext"
        ? `<textarea data-ce-field="${f.path}" rows="5">${escapeHtml(val)}</textarea>`
        : f.type === "textarea"
          ? `<textarea data-ce-field="${f.path}" rows="2">${escapeHtml(val)}</textarea>`
          : `<input data-ce-field="${f.path}" type="text" value="${safe}" />`;
      return `<div class="ce-field"><label>${f.label}</label>${input}</div>`;
    }).join("");

    panel.innerHTML = `
      <div class="ce-section-head">
        <h4>${section.icon} ${section.label}</h4>
        <button class="btn btn--ghost btn--sm" data-ce-reset="${ceActiveSection}" type="button">↺ Restablecer defaults</button>
      </div>
      ${fields}
      <div class="ce-actions">
        <span class="ce-save-status" id="ceSaveStatus">Guardado</span>
        <span style="font-size:12px;color:var(--ink-mute)">Los cambios se guardan automáticamente al salir del campo.</span>
      </div>`;
  }

  function showSaveStatus() {
    const el = document.getElementById("ceSaveStatus");
    if (!el) return;
    el.classList.add("is-visible");
    clearTimeout(showSaveStatus._t);
    showSaveStatus._t = setTimeout(() => el.classList.remove("is-visible"), 1800);
  }

  function bindContentEditor() {
    const nav = document.getElementById("contentNav");
    const panel = document.getElementById("contentPanel");
    if (!nav || !panel) return;

    nav.addEventListener("click", (e) => {
      const tab = e.target.closest("[data-ce-tab]");
      if (!tab) return;
      ceActiveSection = tab.getAttribute("data-ce-tab");
      renderContentEditorNav();
      renderContentEditorPanel();
    });

    panel.addEventListener("change", (e) => {
      const field = e.target.closest("[data-ce-field]");
      if (!field) return;
      const path = field.getAttribute("data-ce-field");
      setContent(path, field.value);
      applyContentToDOM();
      showSaveStatus();
    });

    panel.addEventListener("click", (e) => {
      const reset = e.target.closest("[data-ce-reset]");
      if (!reset) return;
      const section = reset.getAttribute("data-ce-reset");
      if (confirm("¿Restablecer todos los campos de esta sección?")) {
        resetContent(section);
        renderContentEditorPanel();
        toast("Sección restablecida");
      }
    });

    renderContentEditorNav();
    renderContentEditorPanel();
  }

  /* ============== RESERVATIONS QUEUE ============== */
  let reservations = [];

  function loadReservations() {
    try { reservations = JSON.parse(localStorage.getItem(RESERVE_KEY) || "[]"); }
    catch (_) { reservations = []; }
  }
  function persistReservations() {
    try { localStorage.setItem(RESERVE_KEY, JSON.stringify(reservations)); } catch (_) {}
  }
  function saveReservation(data) {
    const localEntry = {
      id: "r" + Date.now(),
      ts: Date.now(),
      ...data
    };
    reservations.unshift(localEntry);
    persistReservations();
    updateDashBadges();
    renderReservations();

    // Backend: insertar en Supabase para que viva entre dispositivos.
    if (window.cbBackend && window.cbBackend.createReservation) {
      const payload = {
        guest_name: data.name || "",
        phone: data.phone || "",
        email: data.email || "",
        party_size: parseInt(data.people, 10) || 2,
        reserve_date: data.date,
        reserve_time: data.time || "20:00",
        zone: data.zone || "sala",
        notes: data.notes || "",
        status: "pending"
      };
      window.cbBackend.createReservation(payload).catch((e) => {
        console.warn("backend reserve failed (sigue local + email)", e);
      });
    }
  }

  function renderReservations() {
    const list = document.getElementById("resvList");
    const badge = document.getElementById("dashResvCount");
    if (!list) return;
    list.innerHTML = `<div class="resv-empty">${state.lang === "es" ? "Cargando reservas…" : "Loading reservations…"}</div>`;

    const fromBackend = (window.cbBackend && window.cbBackend.listAllReservations)
      ? window.cbBackend.listAllReservations({ limit: 200 })
      : Promise.resolve([]);

    fromBackend.then((rows) => {
      // Mezclar backend + locales (deduplicar por id)
      const allMap = new Map();
      rows.forEach((r) => {
        allMap.set(r.id, {
          id: r.id,
          name: r.guest_name,
          phone: r.phone,
          email: r.email,
          people: r.party_size,
          date: r.reserve_date,
          time: r.reserve_time ? r.reserve_time.slice(0, 5) : "",
          zone: r.zone,
          notes: r.notes,
          status: r.status,
          remote: true
        });
      });
      reservations.forEach((r) => {
        if (!allMap.has(r.id)) allMap.set(r.id, r);
      });
      const all = Array.from(allMap.values()).sort((a, b) => {
        const da = a.date + " " + (a.time || "");
        const db = b.date + " " + (b.time || "");
        return da < db ? 1 : -1;
      });

      if (badge) badge.textContent = all.filter((r) => !r.status || r.status === "pending").length;

      if (all.length === 0) {
        list.innerHTML = `<div class="resv-empty">${state.lang === "es" ? "Aún no hay reservas." : "No reservations yet."}</div>`;
        return;
      }
      list.innerHTML = all.map((r) => {
        const d = new Date(r.date + "T" + (r.time || "00:00"));
        const day = d.getDate();
        const month = d.toLocaleDateString(state.lang === "es" ? "es-ES" : "en-GB", { month: "short" }).toUpperCase();
        const remoteBadge = r.remote ? `<span class="resv-row__remote" title="Sincronizada en Supabase">☁️</span>` : "";
        const statusBadge = r.status ? `<span class="resv-row__status resv-row__status--${r.status}">${r.status}</span>` : "";
        return `
          <div class="resv-row" data-resv-id="${r.id}" data-resv-remote="${!!r.remote}">
            <div class="resv-row__date"><strong>${day}</strong><small>${month}</small></div>
            <div class="resv-row__name">
              <strong>${escapeHtml(r.name || "—")}</strong> ${remoteBadge} ${statusBadge}
              <small>${r.time || ""} · ${escapeHtml(r.notes || "")}</small>
            </div>
            <div class="resv-row__contact">${escapeHtml(r.phone || "")}${r.email ? "<br>" + escapeHtml(r.email) : ""}</div>
            <div class="resv-row__zone">${escapeHtml(r.zone || "")}</div>
            <div class="resv-row__pax">${r.people || "—"}</div>
            <button class="resv-row__del" data-resv-del="${r.id}" aria-label="Eliminar">🗑</button>
          </div>`;
      }).join("");
    }).catch((err) => {
      console.warn("Error cargando reservas backend:", err);
      // Fallback al render local
      list.innerHTML = reservations.length === 0
        ? `<div class="resv-empty">${state.lang === "es" ? "Sin reservas (backend offline)." : "No reservations (backend offline)."}</div>`
        : reservations.map((r) => `<div class="resv-row" data-resv-id="${r.id}"><strong>${escapeHtml(r.name || "")}</strong> — ${r.date} ${r.time}</div>`).join("");
    });
  }
  function bindReservations() {
    const list = document.getElementById("resvList");
    if (!list) return;
    list.addEventListener("click", async (e) => {
      const btn = e.target.closest("[data-resv-del]");
      if (!btn) return;
      const id = btn.getAttribute("data-resv-del");
      const row = btn.closest("[data-resv-id]");
      const isRemote = row && row.getAttribute("data-resv-remote") === "true";
      if (!confirm(state.lang === "es" ? "¿Eliminar esta reserva?" : "Delete this reservation?")) return;

      if (isRemote && window.cbBackend && window.cbBackend.updateReservationStatus) {
        try {
          await window.cbBackend.updateReservationStatus(id, "cancelled");
          toast(state.lang === "es" ? "Reserva cancelada ✓" : "Reservation cancelled ✓");
        } catch (err) {
          console.warn("Error cancelando reserva:", err);
          toast(state.lang === "es" ? "Error al cancelar (admin login requerido)" : "Cancel failed (admin login required)");
          return;
        }
      }
      reservations = reservations.filter((r) => r.id !== id);
      persistReservations();
      updateDashBadges();
      renderReservations();
    });
  }

  /* ============== WALL MODERATION ============== */
  function renderWallModeration() {
    const grid = document.getElementById("wallModGrid");
    const badge = document.getElementById("dashWallCount");
    if (!grid) return;
    grid.innerHTML = `<div class="resv-empty" style="grid-column:1/-1">${state.lang === "es" ? "Cargando muro…" : "Loading wall…"}</div>`;

    const fromBackend = (window.cbBackend && window.cbBackend.listAllBpicPhotos)
      ? window.cbBackend.listAllBpicPhotos({ limit: 200 })
      : Promise.resolve([]);

    fromBackend.then((rows) => {
      const remoteMapped = rows.map((r) => ({
        id: r.id,
        src: r.public_url,
        name: r.guest_name,
        handle: r.ig_handle,
        caption: r.caption,
        status: r.status,
        ts: new Date(r.created_at).getTime(),
        remote: true
      }));
      const merged = new Map();
      remoteMapped.forEach((p) => merged.set(p.id, p));
      (bpicStore || []).forEach((p) => { if (!merged.has(p.id)) merged.set(p.id, p); });
      const all = Array.from(merged.values()).sort((a, b) => b.ts - a.ts);

      if (badge) badge.textContent = all.length;
      if (all.length === 0) {
        grid.innerHTML = `<div class="resv-empty" style="grid-column:1/-1">${state.lang === "es" ? "Nadie ha subido fotos al muro aún." : "No one has uploaded to the wall yet."}</div>`;
        return;
      }
      grid.innerHTML = all.map((p) => {
        const d = new Date(p.ts).toLocaleDateString(state.lang === "es" ? "es-ES" : "en-GB", { day: "numeric", month: "short" });
        const remoteBadge = p.remote ? '<span class="wall-mod__remote" title="En Supabase">☁️</span>' : '';
        return `
          <div class="wall-mod" data-wall-id="${p.id}" data-wall-remote="${!!p.remote}">
            <img src="${p.src}" alt="${escapeHtml(p.name || "")}" loading="lazy" />
            <button class="wall-mod__del" data-wall-del="${p.id}" aria-label="Eliminar">×</button>
            <div class="wall-mod__info">
              <strong>${escapeHtml(p.name || "Anónimo")}</strong> ${remoteBadge}
              <span>${d}${p.handle ? " · " + escapeHtml(p.handle) : ""}</span>
            </div>
          </div>`;
      }).join("");
    }).catch((err) => {
      console.warn("Wall backend fetch error:", err);
      grid.innerHTML = `<div class="resv-empty" style="grid-column:1/-1">${state.lang === "es" ? "Sin fotos (login admin para ver Supabase)." : "No photos (admin login required)."}</div>`;
    });
  }
  function bindWallModeration() {
    const grid = document.getElementById("wallModGrid");
    if (!grid) return;
    grid.addEventListener("click", async (e) => {
      const btn = e.target.closest("[data-wall-del]");
      if (!btn) return;
      const id = btn.getAttribute("data-wall-del");
      const card = btn.closest("[data-wall-id]");
      const isRemote = card && card.getAttribute("data-wall-remote") === "true";
      if (!confirm(state.lang === "es" ? "¿Eliminar esta foto del muro?" : "Delete this photo from the wall?")) return;

      if (isRemote && window.cbBackend && window.cbBackend.deleteBpicPhoto) {
        try {
          await window.cbBackend.deleteBpicPhoto(id);
          toast(state.lang === "es" ? "Foto eliminada ✓" : "Photo deleted ✓");
        } catch (err) {
          console.warn("Error borrando foto del muro:", err);
          toast(state.lang === "es" ? "Error al borrar (admin login requerido)" : "Delete failed (admin login required)");
          return;
        }
      }
      bpicStore = bpicStore.filter((p) => p.id !== id);
      persistBpicWall();
      renderBpicWall();
      renderWallModeration();
      updateDashBadges();
    });
  }

  function updateDashBadges() {
    const resvBadge = document.getElementById("dashResvCount");
    const wallBadge = document.getElementById("dashWallCount");
    if (resvBadge) resvBadge.textContent = reservations.length;
    if (wallBadge) wallBadge.textContent = bpicStore ? bpicStore.length : 0;
  }

  /* =====================================================
     CREW EDITOR · per-card photo upload (localStorage)
     ===================================================== */
  const CREW_STORAGE_KEY = "cb_crew_v1";
  let crewPhotos = { 0: null, 1: null };

  function loadCrewFromStorage() {
    try {
      const raw = localStorage.getItem(CREW_STORAGE_KEY);
      if (raw) crewPhotos = JSON.parse(raw);
    } catch (_) {}
    [0, 1].forEach((i) => {
      const img = document.getElementById("crewImg" + i);
      if (!img) return;
      if (crewPhotos[i]) {
        img.src = crewPhotos[i];
      } else {
        // try local default file, then fall back via onerror
        img.src = i === 0 ? "crew/beto.jpg" : "crew/marina.jpg";
      }
    });
  }
  function saveCrewPhoto(i, dataURL) {
    crewPhotos[i] = dataURL;
    safeSetItem(CREW_STORAGE_KEY, JSON.stringify(crewPhotos));
    const img = document.getElementById("crewImg" + i);
    if (img) {
      img.src = dataURL;
      // brief pop animation
      img.animate(
        [{ transform: "scale(0.96)", opacity: 0.4 }, { transform: "scale(1)", opacity: 1 }],
        { duration: 500, easing: "cubic-bezier(0.22,1,0.36,1)" }
      );
    }
  }
  function bindCrewEditor() {
    const input = document.getElementById("crewFileInput");
    if (!input) return;
    document.querySelectorAll("[data-crew-edit]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        input.dataset.target = btn.getAttribute("data-crew-edit");
        input.click();
      });
    });
    input.addEventListener("change", (e) => {
      const idx = parseInt(input.dataset.target || "0", 10);
      const file = e.target.files && e.target.files[0];
      input.value = "";
      if (!file) return;
      if (!isImageFile(file)) return;
      if (file.size > 25 * 1024 * 1024) {
        toast(t("gallery.tooBig").replace("{{name}}", file.name));
        return;
      }
      readImageToDataURL(file).then(({ dataURL }) => {
        saveCrewPhoto(idx, dataURL);
        toast(t("crew.saved"));
      }).catch(() => {});
    });
  }


  /* =====================================================
     SCROLL REVEAL  |  MAGNETIC  |  TILT  |  COUNT-UP
     ===================================================== */
  function initScrollReveal() {
    const els = $$("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    els.forEach((el) => io.observe(el));
  }

  // Detectar dispositivos sin pointer fino (móvil/tablet) → desactivar
  // efectos hover que sólo añaden jank en touch.
  const HAS_FINE_POINTER = typeof window.matchMedia === "function" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  // requestAnimationFrame throttle helper para handlers de mousemove
  function rafThrottle(fn) {
    let scheduled = false;
    let lastEvent = null;
    return function (e) {
      lastEvent = e;
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        fn(lastEvent);
      });
    };
  }

  function initMagnetic() {
    if (!HAS_FINE_POINTER) return;
    $$(".magnetic").forEach((el) => {
      const onMove = rafThrottle((e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`;
      });
      el.addEventListener("mousemove", onMove, { passive: true });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; }, { passive: true });
    });
  }

  function initKpiGlow() {
    if (!HAS_FINE_POINTER) return;
    // Sólo cuando hay KPIs visibles → enganchamos al contenedor del dashboard.
    // No usar document-level listener para no penalizar el sitio público.
    const dash = document.querySelector(".kpi-row");
    if (!dash) return;
    const onMove = rafThrottle((e) => {
      const kpi = e.target.closest(".kpi");
      if (!kpi) return;
      const rect = kpi.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * 100;
      const my = ((e.clientY - rect.top) / rect.height) * 100;
      kpi.style.setProperty("--mx", mx + "%");
      kpi.style.setProperty("--my", my + "%");
    });
    dash.addEventListener("mousemove", onMove, { passive: true });
  }

  function initDishTilt() {
    if (!HAS_FINE_POINTER) return;
    const grid = $("#publicMenuGrid");
    if (!grid) return;
    const onMove = rafThrottle((e) => {
      const card = e.target.closest(".dish-card");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * 100;
      const my = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--mx", mx + "%");
      card.style.setProperty("--my", my + "%");
      const rx = ((my / 100) - 0.5) * -6;
      const ry = ((mx / 100) - 0.5) * 6;
      card.style.transform = `translateY(-4px) perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    grid.addEventListener("mousemove", onMove, { passive: true });
    grid.addEventListener("mouseleave", () => {
      $$(".dish-card", grid).forEach((c) => { c.style.transform = ""; });
    }, { passive: true });
    grid.addEventListener("mouseout", (e) => {
      const card = e.target.closest(".dish-card");
      if (card && !card.contains(e.relatedTarget)) card.style.transform = "";
    }, { passive: true });
  }

  function initCountUp() {
    const targets = $$("#kpiProducts, #kpiOutstock, #kpiPromos");
    targets.forEach((el) => {
      const final = parseInt(el.textContent, 10);
      if (isNaN(final)) return;
      let cur = 0;
      const stepN = Math.max(1, Math.ceil(final / 20));
      const t = setInterval(() => {
        cur += stepN;
        if (cur >= final) { cur = final; clearInterval(t); }
        el.textContent = cur;
      }, 35);
    });
  }

  /* =====================================================
     BINDINGS  for reservation + chat
     ===================================================== */
  function bindExtras() {
    // Reservation triggers
    $$("[data-open-reserve]").forEach((b) => b.addEventListener("click", openReserveModal));
    $$("[data-close-reserve]").forEach((b) => b.addEventListener("click", closeReserveModal));

    // Esc to close modal
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { closeReserveModal(); closeChat(); }
    });

    // Stepper
    const peopleInput = $('input[name="people"]');
    $("[data-step-minus]")?.addEventListener("click", () => {
      const v = Math.max(1, parseInt(peopleInput.value, 10) - 1);
      peopleInput.value = v;
    });
    $("[data-step-plus]")?.addEventListener("click", () => {
      const v = Math.min(20, parseInt(peopleInput.value, 10) + 1);
      peopleInput.value = v;
    });

    // Next/back
    $("[data-reserve-next]")?.addEventListener("click", () => {
      const form = $("#reserveForm");
      if (!form.reportValidity()) return;
      const data = readReserveForm();
      $("#reserveSummary").innerHTML = reserveSummaryHTML(data);
      $("#waSendBtn").href = buildWaURL(data);
      $("#calSendBtn").href = buildGoogleCalURL(data);
      goToReserveStep(2);
    });
    $("[data-reserve-back]")?.addEventListener("click", () => goToReserveStep(1));

    $("#waSendBtn")?.addEventListener("click", () => {
      const data = readReserveForm();
      saveReservation(data);
      toast(t("chat.confirm.wa"));
      setTimeout(closeReserveModal, 900);
    });
    $("#calSendBtn")?.addEventListener("click", () => {
      const data = readReserveForm();
      saveReservation(data);
      toast(state.lang === "es" ? "Abriendo Google Calendar (el bar recibe invitación)..." : "Opening Google Calendar (the bar gets invited)...");
    });
    $("#emailSendBtn")?.addEventListener("click", async (e) => {
      const btn = e.currentTarget;
      const data = readReserveForm();
      btn.disabled = true;
      const original = btn.innerHTML;
      btn.innerHTML = "⏳ <span>" + (state.lang === "es" ? "Enviando..." : "Sending...") + "</span>";
      saveReservation(data);
      const ok = await sendReservationByEmail(data);
      btn.disabled = false;
      btn.innerHTML = original;
      if (ok) {
        toast(t("toast.emailSent"));
        setTimeout(closeReserveModal, 1200);
      } else {
        // Fallback: open mailto
        toast(t("toast.emailFallback"));
        window.location.href = buildMailtoFallback(data);
      }
    });

    // Chat
    $("#chatLauncher")?.addEventListener("click", openChat);
    $("[data-close-chat]")?.addEventListener("click", closeChat);
    $("#chatHumanPill")?.addEventListener("click", () => {
      if (!$("#chatWidget").classList.contains("is-open")) openChat();
      // small simulated user action so the transcript reflects intent
      userSay(state.lang === "es" ? "Quiero hablar con una persona" : "I'd like to talk to a person");
      setTimeout(() => offerHumanHandover("user"), 400);
    });
    $("#chatInputForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = $("#chatInput");
      const val = input.value.trim();
      if (!val) return;
      userSay(val);
      input.value = "";
      setTimeout(() => handleIntent(val), 250);
    });
    $("#chatQuick")?.addEventListener("click", (e) => {
      const b = e.target.closest("button[data-quick]");
      if (!b) return;
      userSay(b.textContent);
      runQuickAction(b.dataset.quick);
    });

    // Auto-tease chat after some seconds (one time)
    setTimeout(() => {
      if (state.view !== "public") return;
      const badge = $("#chatUnread");
      if (badge && !$("#chatWidget").classList.contains("is-open")) badge.removeAttribute("hidden");
    }, 8000);
  }

  // Patch init() to wire the new pieces
  const __origInit = init;
  init = function () {
    __origInit();
    bindExtras();
    // Clear stale crew localStorage so the new edited photos load
    try {
      const v = localStorage.getItem("cb_crew_version");
      if (v !== "v2") { localStorage.removeItem("cb_crew_v1"); localStorage.setItem("cb_crew_version", "v2"); }
    } catch (_) {}
    loadAuth();
    bindAuth();
    updateAuthUI();
    // Cookie consent (mostrar banner si no hay decision previa)
    const hasConsent = loadCookieConsent();
    bindCookieConsent();
    bindLegal();
    if (!hasConsent) setTimeout(showCookieBanner, 1000);
    // Customer auth
    loadCustomers();
    bindCustomer();
    bindCustomersPanel();
    updateCustomerUI();
    loadContent();
    loadImages();
    loadReservations();
    renderEventGrid();
    // Aplicar contenido editable después de que el i18n inicial corra
    setTimeout(applyContentToDOM, 60);
    // Wire up dashboard CMS panels
    bindContentEditor();
    bindReservations();
    bindWallModeration();
    bindImageManager();
    bindDesignPanel();
    bindPaymentsPanel();
    bindBackupPanel();
    bindStatsPanel();
    bindConsumptionPanel();
    bindGReview();
    applyGReviewToButton();
    applyDesignFromStorage();
    updateDashBadges();
    // Aplicar imágenes custom guardadas
    setTimeout(applyAllImages, 80);
    loadCrewFromStorage();
    bindCrewEditor();
    loadBpicWall();
    bindBpic();
    loadPetGallery();
    bindPetGallery();
    bindPetsModeration();
    updateDashBadgesPet();
    initScrollReveal();
    initMagnetic();
    initDishTilt();
    initKpiGlow();
    setTimeout(initCountUp, 350);
    registerServiceWorker();
    initAnalytics();
  };

  // ====================================================================
  // ============== SERVICE WORKER · PWA install ========================
  // ====================================================================
  function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) return;
    // Sólo en producción (no en localhost via 127.0.0.1) o cuando hay HTTPS
    if (location.protocol !== "https:" && location.hostname !== "localhost" && location.hostname !== "127.0.0.1") return;
    window.addEventListener("load", () => {
      // Sync menu stock/prices from Supabase after all scripts are loaded
      setTimeout(syncMenuFromSupabase, 800);
      navigator.serviceWorker.register("/sw.js")
        .then((reg) => {
          // Update silently
          reg.addEventListener("updatefound", () => {
            const nw = reg.installing;
            if (!nw) return;
            nw.addEventListener("statechange", () => {
              if (nw.state === "installed" && navigator.serviceWorker.controller) {
                // New version available — no-op for v1; could show a "refresh" toast
              }
            });
          });
        })
        .catch(() => {});
    });
  }

  // ====================================================================
  // ============== ANALYTICS (GA4 + Consent Mode v2) ===================
  // ====================================================================
  function initAnalytics() {
    let analyticsId = "";
    try {
      const payments = JSON.parse(localStorage.getItem("cb.payments.v1") || "{}");
      if (payments.analytics && payments.analytics.enabled && payments.analytics.id) {
        analyticsId = payments.analytics.id;
      }
    } catch (_) {}
    if (!analyticsId) return;

    // Consent Mode v2 — default DENIED, then update from cookie consent.
    window.dataLayer = window.dataLayer || [];
    function gtag(){ window.dataLayer.push(arguments); }
    window.gtag = gtag;

    gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
      functionality_storage: "granted",
      security_storage: "granted",
      wait_for_update: 500
    });

    // Sync from our cookie consent
    try {
      const consent = JSON.parse(localStorage.getItem("cb.cookies.v1") || "{}");
      if (consent.analytics) {
        gtag("consent", "update", { analytics_storage: "granted" });
      }
      if (consent.marketing) {
        gtag("consent", "update", { ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted" });
      }
    } catch (_) {}

    // Inject GA script
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(analyticsId)}`;
    document.head.appendChild(s);

    gtag("js", new Date());
    gtag("config", analyticsId, {
      anonymize_ip: true,
      allow_google_signals: false
    });
  }

  // ====================================================================
  // ============== PET GALLERY · "Los peludos del Capitán" =============
  // ====================================================================
  const PET_KEY = "cb.pet.gallery.v1";

  let petStore = [];
  let petPendingDataURL = null;
  let petPendingFile = null;  // File ORIGINAL para subir al storage

  function loadPetGallery() {
    // 1. Hidratamos rápido desde localStorage (instant render)
    try {
      const raw = localStorage.getItem(PET_KEY);
      petStore = raw ? JSON.parse(raw) : [];
    } catch (_) { petStore = []; }
    renderPetGallery();
    animatePetCounter();

    // 2. Refrescamos desde el backend SÓLO después del primer paint
    // y cuando el navegador esté idle → no compite con interacciones.
    if (!window.cbBackend) return;
    const fetchBackend = () => window.cbBackend.listPetPhotos({ status: "approved", limit: 60 })
      .then((rows) => {
        if (!Array.isArray(rows) || rows.length === 0) return;
        const fromBackend = rows.map((r) => ({
          id: r.id,
          name: r.pet_name,
          owner: r.owner_name,
          breed: r.breed,
          src: r.public_url,
          ts: new Date(r.created_at).getTime(),
          approved: true,
          remote: true
        }));
        const localPending = petStore.filter((p) => !p.remote && p.approved === false);
        petStore = fromBackend.concat(localPending);
        renderPetGallery();
        animatePetCounter();
      })
      .catch((e) => console.warn("pet backend fetch failed", e));
    // Diferir hasta idle (o 1.2s) — el sitio responde a clicks al instante.
    if ("requestIdleCallback" in window) {
      requestIdleCallback(fetchBackend, { timeout: 2000 });
    } else {
      setTimeout(fetchBackend, 1200);
    }
  }
  function persistPetGallery() {
    safeSetItem(PET_KEY, JSON.stringify(petStore));
  }

  function renderPetGallery() {
    const gal = document.getElementById("petGallery");
    if (!gal) return;
    // Sólo mostramos en público los aprobados
    const all = petStore.filter((p) => p.approved !== false);
    if (all.length === 0) {
      gal.innerHTML = `
        <div class="pet-gallery__empty">
          <div class="pet-gallery__empty-icon">🐾</div>
          <strong>${state.lang === "es" ? "Aún no hay fotos en la manada" : "No photos in the pack yet"}</strong>
          <p>${state.lang === "es"
            ? "Vení al bar con tu peludo, sacate una foto en la barra o en la mesa, y subila desde acá. Sumate a la manada del Capitán."
            : "Come to the bar with your furry friend, snap a photo at the bar or table, and upload it from here. Join the Captain's pack."}</p>
        </div>`;
      updateDashBadges();
      return;
    }
    const thanksWith = state.lang === "es"
      ? (n) => `🐾 ¡Gracias por visitar Capitán Beto, ${n}!`
      : (n) => `🐾 Thanks for stopping by Capitán Beto, ${n}!`;
    const conWord = state.lang === "es" ? "con" : "with";
    gal.innerHTML = all.map((p) => `
      <figure class="pet-tile">
        <img src="${p.src}" alt="${escapeHtml(p.name || "Peludo")}" loading="lazy" />
        <figcaption class="pet-tile__cap">
          <strong>${escapeHtml(p.name || "Peludo")}</strong>
          ${p.breed ? `<small>${escapeHtml(p.breed)}</small>` : ""}
          ${p.owner ? `<em>${conWord} ${escapeHtml(p.owner)}</em>` : ""}
        </figcaption>
        <div class="pet-tile__thanks" aria-label="${escapeHtml(thanksWith(p.name || "amigo"))}">
          <span>${escapeHtml(thanksWith(p.name || (state.lang === "es" ? "amigo" : "friend")))}</span>
        </div>
      </figure>
    `).join("");
    updateDashBadges();
  }

  // ============ Dashboard moderation ============
  // Cache de fotos del backend para moderación
  let petsModCache = [];

  function renderPetsModeration() {
    const grid = document.getElementById("petsModGrid");
    if (!grid) return;
    // Cargar desde el backend si admin está autenticado
    const useBackend = !!(window.cbBackend && window.cbBackend.getSession && window.cbBackend.getSession());
    if (useBackend) {
      grid.innerHTML = `<p class="muted-sm">Cargando fotos del backend…</p>`;
      window.cbBackend.listAllPetPhotos({ limit: 200 }).then((rows) => {
        petsModCache = rows;
        renderPetsModerationFromCache(rows);
      }).catch((e) => {
        console.warn("listAllPetPhotos failed", e);
        renderPetsModerationLocal();
      });
    } else {
      renderPetsModerationLocal();
    }
  }

  function renderPetsModerationFromCache(rows) {
    const grid = document.getElementById("petsModGrid");
    const total = rows.length;
    const pending = rows.filter((p) => p.status === "pending").length;
    const approved = rows.filter((p) => p.status === "approved").length;
    const t1 = document.getElementById("petsStatTotal");
    const t2 = document.getElementById("petsStatPending");
    const t3 = document.getElementById("petsStatApproved");
    if (t1) t1.textContent = total;
    if (t2) t2.textContent = pending;
    if (t3) t3.textContent = approved;
    if (rows.length === 0) {
      grid.innerHTML = `<div class="bpic-empty">${state.lang === "es"
        ? "Aún no hay fotos en el backend. Cuando un cliente suba una desde el sitio público aparece acá."
        : "No photos in the backend yet. When a customer uploads one from the public site it shows up here."}</div>`;
      return;
    }
    grid.innerHTML = rows.map((p) => {
      const date = new Date(p.created_at).toLocaleDateString(state.lang === "es" ? "es-ES" : "en-GB", { day: "numeric", month: "short", year: "numeric" });
      const isPending = p.status === "pending";
      const isRejected = p.status === "rejected";
      const flagClass = isPending ? "" : (isRejected ? " pet-mod-card__flag--rej" : " pet-mod-card__flag--ok");
      const flagText = isPending ? (state.lang === "es" ? "Pendiente" : "Pending")
        : (isRejected ? (state.lang === "es" ? "Rechazada" : "Rejected")
        : (state.lang === "es" ? "Público" : "Live"));
      const cardClass = isPending ? "pet-mod-card--pending" : (isRejected ? "pet-mod-card--rej" : "pet-mod-card--ok");
      return `
        <article class="pet-mod-card ${cardClass}" data-pet-id="${p.id}">
          <div class="pet-mod-card__img">
            <img src="${p.public_url}" alt="${escapeHtml(p.pet_name || "Peludo")}" loading="lazy" />
            <span class="pet-mod-card__flag${flagClass}">${flagText}</span>
          </div>
          <div class="pet-mod-card__body">
            <div class="pet-mod-card__fields">
              <label class="field">
                <small>${state.lang === "es" ? "Nombre del peludo" : "Pet name"}</small>
                <input type="text" data-pet-edit="pet_name" data-pet-id="${p.id}" value="${escapeHtml(p.pet_name || "")}" />
              </label>
              <label class="field">
                <small>${state.lang === "es" ? "Dueño" : "Owner"}</small>
                <input type="text" data-pet-edit="owner_name" data-pet-id="${p.id}" value="${escapeHtml(p.owner_name || "")}" />
              </label>
              <label class="field">
                <small>${state.lang === "es" ? "Raza / especie" : "Breed / species"}</small>
                <input type="text" data-pet-edit="breed" data-pet-id="${p.id}" value="${escapeHtml(p.breed || "")}" />
              </label>
            </div>
            <div class="pet-mod-card__meta"><span>📅 ${date}</span></div>
            <div class="pet-mod-card__actions">
              ${isPending
                ? `<button class="btn btn--primary btn--sm" data-pet-approve="${p.id}" type="button">✓ ${state.lang === "es" ? "Aprobar" : "Approve"}</button>
                   <button class="btn btn--ghost btn--sm" data-pet-reject="${p.id}" type="button">✕ ${state.lang === "es" ? "Rechazar" : "Reject"}</button>`
                : `<button class="btn btn--ghost btn--sm" data-pet-reject="${p.id}" type="button">↺ ${state.lang === "es" ? "Despublicar" : "Unpublish"}</button>`}
              <button class="btn btn--ghost btn--sm" data-pet-save="${p.id}" type="button">💾 ${state.lang === "es" ? "Guardar" : "Save"}</button>
              <button class="btn btn--ghost btn--sm pet-mod-card__del" data-pet-delete="${p.id}" type="button">🗑 ${state.lang === "es" ? "Eliminar" : "Delete"}</button>
            </div>
          </div>
        </article>`;
    }).join("");
  }

  function renderPetsModerationLocal() {
    const grid = document.getElementById("petsModGrid");
    grid.innerHTML = `<div class="bpic-empty">${state.lang === "es"
      ? "Iniciá sesión como admin para ver las fotos del backend."
      : "Sign in as admin to see backend photos."}</div>`;
  }

  function bindPetsModeration() {
    const panel = document.querySelector('[data-dash-panel="pets"]');
    if (!panel) return;
    panel.addEventListener("click", async (e) => {
      const ap = e.target.closest("[data-pet-approve]");
      const rj = e.target.closest("[data-pet-reject]");
      const sv = e.target.closest("[data-pet-save]");
      const del = e.target.closest("[data-pet-delete]");
      const id = (ap || rj || sv || del)?.dataset.petApprove
              || (ap || rj || sv || del)?.dataset.petReject
              || (ap || rj || sv || del)?.dataset.petSave
              || (ap || rj || sv || del)?.dataset.petDelete;
      if (!id || !window.cbBackend) return;
      try {
        if (ap) {
          await window.cbBackend.approvePetPhoto(id);
          toast(state.lang === "es" ? "Foto aprobada ✓" : "Photo approved ✓");
        } else if (rj) {
          await window.cbBackend.rejectPetPhoto(id);
          toast(state.lang === "es" ? "Rechazada" : "Rejected");
        } else if (sv) {
          const patch = {};
          panel.querySelectorAll(`[data-pet-id="${id}"][data-pet-edit]`).forEach((inp) => {
            patch[inp.dataset.petEdit] = inp.value.trim();
          });
          await fetch(`${window.cbBackend.URL}/rest/v1/pet_photos?id=eq.${encodeURIComponent(id)}`, {
            method: "PATCH",
            headers: {
              "apikey": window.cbBackend.ANON_KEY,
              "Authorization": `Bearer ${window.cbBackend.getSession().access_token}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(patch)
          });
          toast(state.lang === "es" ? "Guardado ✓" : "Saved ✓");
        } else if (del) {
          if (!confirm(state.lang === "es" ? "¿Eliminar esta foto?" : "Delete this photo?")) return;
          await window.cbBackend.deletePetPhoto(id);
          toast(state.lang === "es" ? "Eliminada" : "Deleted");
        }
        renderPetsModeration();
        // Re-render galería pública también
        loadPetGallery();
      } catch (err) {
        console.warn("mod action failed", err);
        toast(state.lang === "es"
          ? "Acción rechazada (¿permisos?). Revisá la consola."
          : "Action rejected (permissions?). Check console.");
      }
    });
    document.getElementById("petAddFromDash")?.addEventListener("click", openPetModal);
  }

  function updateDashBadgesPet() {
    const badge = document.getElementById("dashPetsCount");
    if (!badge) return;
    // Sólo si admin logueado pedimos el conteo real
    if (window.cbBackend && window.cbBackend.getSession && window.cbBackend.getSession()) {
      window.cbBackend.listAllPetPhotos({ limit: 200 }).then((rows) => {
        const pending = rows.filter((r) => r.status === "pending").length;
        badge.textContent = pending;
        badge.style.display = pending > 0 ? "" : "none";
      }).catch(() => {});
    } else {
      const pending = petStore.filter((p) => p.approved === false).length;
      badge.textContent = pending;
      badge.style.display = pending > 0 ? "" : "none";
    }
  }

  function animatePetCounter() {
    const el = document.getElementById("petCounterNum");
    if (!el) return;
    const base = parseInt(el.dataset.count || "247", 10);
    const total = base + petStore.length;
    const dur = 1600;
    const t0 = performance.now();
    function step(t) {
      const k = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(total * eased).toLocaleString(state.lang === "es" ? "es-ES" : "en-GB");
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function openPetModal() {
    const m = document.getElementById("petUploadModal");
    if (!m) return;
    m.classList.add("is-open");
    m.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closePetModal() {
    const m = document.getElementById("petUploadModal");
    if (!m) return;
    m.classList.remove("is-open");
    m.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    const form = document.getElementById("petUploadForm");
    if (form) form.reset();
    const prev = document.getElementById("petPreview");
    if (prev) { prev.hidden = true; prev.src = ""; }
    petPendingDataURL = null;
    petPendingFile = null;
  }

  function handlePetFile(file) {
    if (!file) return;
    if (!isImageFile(file)) {
      toast(state.lang === "es" ? "Archivo debe ser imagen" : "File must be an image");
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      toast(state.lang === "es" ? "Máximo 25 MB" : "Max 25 MB");
      return;
    }
    // Guardamos el File ORIGINAL para subirlo intacto al storage.
    petPendingFile = file;
    readImageToDataURL(file).then(({ dataURL }) => {
      petPendingDataURL = dataURL;  // sólo para preview
      const prev = document.getElementById("petPreview");
      if (prev) { prev.src = petPendingDataURL; prev.hidden = false; }
    }).catch(() => {
      toast(state.lang === "es" ? "No se pudo procesar la imagen" : "Could not process the image");
    });
  }

  function bindPetGallery() {
    document.getElementById("petUploadOpen")?.addEventListener("click", openPetModal);
    document.querySelectorAll("[data-close-pet]").forEach((b) =>
      b.addEventListener("click", closePetModal)
    );

    const drop = document.getElementById("petDrop");
    const fileInput = document.getElementById("petFile");
    if (drop && fileInput) {
      drop.addEventListener("click", () => fileInput.click());
      drop.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fileInput.click(); }
      });
      drop.addEventListener("dragover", (e) => { e.preventDefault(); drop.classList.add("is-dragging"); });
      drop.addEventListener("dragleave", () => drop.classList.remove("is-dragging"));
      drop.addEventListener("drop", (e) => {
        e.preventDefault();
        drop.classList.remove("is-dragging");
        const f = e.dataTransfer.files && e.dataTransfer.files[0];
        handlePetFile(f);
      });
      fileInput.addEventListener("change", (e) => handlePetFile(e.target.files[0]));
    }

    const form = document.getElementById("petUploadForm");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!petPendingDataURL) {
          toast(state.lang === "es" ? "Subí una foto primero" : "Add a photo first");
          return;
        }
        const fd = new FormData(form);
        const isAdmin = (typeof currentUser !== "undefined" && currentUser && ADMIN_EMAILS.includes(currentUser.email));
        const petName = (fd.get("petName") || "").toString().trim() || "Peludo";
        const ownerName = (fd.get("ownerName") || "").toString().trim();
        const breed = (fd.get("breed") || "").toString().trim();

        // Indicador de subida
        const submitBtn = form.querySelector("button[type='submit']");
        const originalLabel = submitBtn ? submitBtn.textContent : "";
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = state.lang === "es" ? "Subiendo…" : "Uploading…";
        }

        // 1. Intentamos backend Supabase · pasamos el FILE original
        //    para que se suba intacto al storage (no el preview comprimido).
        const uploadPromise = (window.cbBackend && window.cbBackend.uploadPetPhoto)
          ? window.cbBackend.uploadPetPhoto({
              dataURL: petPendingDataURL,
              file: petPendingFile,   // ⭐ original
              petName, ownerName, breed
            })
          : Promise.reject(new Error("no_backend"));

        uploadPromise.then((row) => {
          // Subida exitosa → la foto aparece YA en la galería pública
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalLabel; }
          closePetModal();
          updateDashBadgesPet();
          // Inyectar la foto recién subida al store local para que aparezca
          // sin esperar el siguiente refetch (que está debounced/diferido).
          const newEntry = {
            id: row.id,
            src: row.public_url,
            name: row.pet_name || petName,
            owner: row.owner_name || ownerName,
            breed: row.breed || breed,
            ts: Date.now(),
            approved: true,
            remote: true
          };
          petStore.unshift(newEntry);
          renderPetGallery();
          animatePetCounter();
          toast(state.lang === "es"
            ? `¡${newEntry.name} ya está en la manada! 🐾`
            : `${newEntry.name} just joined the pack! 🐾`);
          if (state.dashTab === "pets") renderPetsModeration();
        }).catch((err) => {
          console.warn("Backend pet upload failed, fallback a localStorage:", err);
          // Fallback local — mismo comportamiento de antes
          const entry = {
            src: petPendingDataURL,
            name: petName, owner: ownerName, breed,
            ts: Date.now(),
            approved: !!isAdmin
          };
          petStore.unshift(entry);
          persistPetGallery();
          renderPetGallery();
          renderPetsModeration();
          updateDashBadgesPet();
          animatePetCounter();
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalLabel; }
          closePetModal();
          toast(state.lang === "es"
            ? (isAdmin ? `¡${entry.name} está en la manada (offline)! 🐾` : `Subido sin conexión a backend. ${entry.name} sólo se ve en este dispositivo.`)
            : (isAdmin ? `${entry.name} joined the pack (offline)! 🐾` : `Uploaded without backend. ${entry.name} only shows on this device.`));
        });
        return;
      });
    }
  }

  // ====================================================================
  // ============== GOOGLE REVIEW URL (editable desde Channels) =========
  // ====================================================================
  const GREVIEW_KEY = "cb.googleReview.v1";
  function loadGReview() {
    return localStorage.getItem(GREVIEW_KEY) || "";
  }
  function applyGReviewToButton() {
    const link = document.getElementById("googleReviewLink");
    const stored = loadGReview();
    if (link && stored) link.href = stored;
    const input = document.getElementById("googleReviewInput");
    if (input) input.value = stored;
    const status = document.getElementById("googleReviewStatus");
    if (status) {
      if (stored) {
        status.textContent = state.lang === "es" ? "Conectado" : "Connected";
        status.className = "badge badge--ok";
      } else {
        status.textContent = state.lang === "es" ? "Configurar" : "Set up";
        status.className = "badge";
      }
    }
  }
  function bindGReview() {
    document.getElementById("googleReviewSave")?.addEventListener("click", () => {
      const input = document.getElementById("googleReviewInput");
      if (!input) return;
      const v = input.value.trim();
      if (v && !/^https?:\/\//i.test(v)) {
        toast(state.lang === "es" ? "URL inválida" : "Invalid URL");
        return;
      }
      try { localStorage.setItem(GREVIEW_KEY, v); } catch (_) {}
      applyGReviewToButton();
      toast(state.lang === "es" ? "Enlace de reseña Google guardado ✓" : "Google review link saved ✓");
    });
  }

  // ====================================================================
  // ============== STATS PANEL (charts + forecast) =====================
  // ====================================================================
  let statsRange = 30;
  let statsCache = { daily: null, top: null, heat: null };

  function fmtEUR(cents) {
    return (cents / 100).toLocaleString(state.lang === "es" ? "es-ES" : "en-GB", {
      style: "currency", currency: "EUR", maximumFractionDigits: 0
    });
  }

  /**
   * Regresión lineal simple sobre y vs índice → devuelve { slope, intercept }
   * para proyectar siguientes n días.
   */
  function linearForecast(values, daysAhead) {
    const n = values.length;
    if (n < 3) return Array(daysAhead).fill(values[n - 1] || 0);
    const sumX = (n - 1) * n / 2;
    const sumY = values.reduce((a, b) => a + b, 0);
    const sumXY = values.reduce((acc, y, i) => acc + i * y, 0);
    const sumXX = values.reduce((acc, _, i) => acc + i * i, 0);
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    const out = [];
    for (let i = 0; i < daysAhead; i++) {
      out.push(Math.max(0, intercept + slope * (n + i)));
    }
    return out;
  }

  function renderStatsPanel() {
    if (!window.cbBackend) return;
    Promise.all([
      window.cbBackend.fetchDailyRevenue({ days: statsRange }),
      window.cbBackend.fetchTopDishes({ limit: 8 }),
      window.cbBackend.fetchHourlyHeatmap()
    ]).then(([daily, top, heat]) => {
      statsCache = { daily, top, heat };
      renderStatsKpis(daily);
      renderDailyChart(daily);
      renderTopDishes(top);
      renderHeatmap(heat);
    }).catch((e) => console.warn("stats failed", e));
  }

  function renderStatsKpis(daily) {
    // Sumamos por día (las views devuelven una fila por (day, shift))
    const byDay = {};
    daily.forEach((r) => {
      const d = r.day;
      if (!byDay[d]) byDay[d] = { rev: 0, items: 0 };
      byDay[d].rev += +r.revenue_cents;
      byDay[d].items += +r.items_sold;
    });
    const days = Object.keys(byDay).sort();
    const rev = days.reduce((a, d) => a + byDay[d].rev, 0);
    const items = days.reduce((a, d) => a + byDay[d].items, 0);
    const avg = items > 0 ? Math.round(rev / items * 100) / 100 : 0;
    // Forecast
    const values = days.map((d) => byDay[d].rev);
    const forecast = linearForecast(values, 7).reduce((a, b) => a + b, 0);
    const trend = values.length >= 2 ? values[values.length - 1] - values[0] : 0;
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set("kpiRevenue", fmtEUR(rev));
    set("kpiOrders", items.toLocaleString());
    set("kpiAvgTicket", fmtEUR(avg * 100));
    set("kpiForecast", fmtEUR(forecast));
    set("kpiRevenueDelta", trend >= 0 ? "📈 tendencia positiva" : "📉 tendencia a la baja");
    const elDeltaRev = document.getElementById("kpiRevenueDelta");
    if (elDeltaRev) elDeltaRev.className = "kpi__delta " + (trend >= 0 ? "up" : "down");
  }

  function renderDailyChart(daily) {
    const svg = document.getElementById("chartDaily");
    if (!svg) return;
    const byDay = {};
    daily.forEach((r) => {
      const d = r.day;
      if (!byDay[d]) byDay[d] = 0;
      byDay[d] += +r.revenue_cents;
    });
    const days = Object.keys(byDay).sort();
    const values = days.map((d) => byDay[d]);
    const forecast = linearForecast(values, 7);
    const allValues = values.concat(forecast);
    const W = 720, H = 240, padL = 50, padR = 12, padT = 18, padB = 28;
    const max = Math.max(1, ...allValues);
    const total = allValues.length;
    const xStep = (W - padL - padR) / Math.max(1, total - 1);
    const yScale = (v) => H - padB - (v / max) * (H - padT - padB);

    const pathReal = values.map((v, i) => `${i === 0 ? "M" : "L"} ${padL + i * xStep} ${yScale(v)}`).join(" ");
    const fStartIdx = values.length;
    const pathForecast = forecast.map((v, i) => {
      const idx = fStartIdx + i;
      return `${i === 0 ? "M" : "L"} ${padL + idx * xStep} ${yScale(v)}`;
    }).join(" ");

    // Area under real
    const areaPath = pathReal +
      ` L ${padL + (values.length - 1) * xStep} ${H - padB} L ${padL} ${H - padB} Z`;

    const labels = [];
    const tickEvery = Math.max(1, Math.floor(days.length / 6));
    days.forEach((d, i) => {
      if (i % tickEvery !== 0 && i !== days.length - 1) return;
      const dt = new Date(d);
      const lbl = dt.toLocaleDateString(state.lang === "es" ? "es-ES" : "en-GB", { day: "numeric", month: "short" });
      labels.push(`<text x="${padL + i * xStep}" y="${H - 8}" font-size="10" fill="#7c726a" text-anchor="middle">${lbl}</text>`);
    });

    svg.innerHTML = `
      <defs>
        <linearGradient id="dailyArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1F4A2E" stop-opacity="0.32"/>
          <stop offset="100%" stop-color="#1F4A2E" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <path d="${areaPath}" fill="url(#dailyArea)"/>
      <path d="${pathReal}" fill="none" stroke="#1F4A2E" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="${pathForecast}" fill="none" stroke="#C9612F" stroke-width="2.2" stroke-dasharray="6 4" stroke-linecap="round"/>
      <line x1="${padL + values.length * xStep}" y1="${padT}" x2="${padL + values.length * xStep}" y2="${H - padB}" stroke="#C9612F" stroke-dasharray="2 4" opacity="0.4"/>
      <text x="${padL + values.length * xStep + 4}" y="${padT + 10}" font-size="10" fill="#C9612F">hoy</text>
      ${labels.join("")}
      <text x="${padL}" y="${padT + 4}" font-size="10" fill="#7c726a">${fmtEUR(max)}</text>
      <text x="${padL}" y="${H - padB}" font-size="10" fill="#7c726a">0</text>
    `;
  }

  function renderTopDishes(top) {
    const wrap = document.getElementById("topDishesList");
    if (!wrap) return;
    if (!top.length) { wrap.innerHTML = `<p class="muted-sm">Sin datos aún.</p>`; return; }
    const max = Math.max(...top.map((d) => +d.revenue_cents));
    wrap.innerHTML = top.map((d, i) => `
      <div class="top-dish">
        <div class="top-dish__rank">${i + 1}</div>
        <div class="top-dish__info">
          <strong>${escapeHtml(d.dish_title || "—")}</strong>
          <small>${d.units_sold} ud · ${escapeHtml(d.category)}</small>
        </div>
        <div class="top-dish__bar">
          <div class="top-dish__fill" style="width:${((+d.revenue_cents / max) * 100).toFixed(1)}%"></div>
        </div>
        <div class="top-dish__rev">${fmtEUR(+d.revenue_cents)}</div>
      </div>
    `).join("");
  }

  function renderHeatmap(rows) {
    const svg = document.getElementById("chartHeatmap");
    if (!svg) return;
    const W = 720, H = 280;
    const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
    const hours = Array.from({ length: 24 }, (_, h) => h);
    const padL = 48, padT = 24, padB = 28, padR = 12;
    const cellW = (W - padL - padR) / hours.length;
    const cellH = (H - padT - padB) / days.length;
    // PG dow: 0=Sun..6=Sat. Normalizamos a Mon-first
    const idxFromDow = (dow) => (dow + 6) % 7;
    const grid = Array.from({ length: 7 }, () => Array(24).fill(0));
    rows.forEach((r) => {
      const di = idxFromDow(+r.dow);
      const hi = +r.hour_madrid;
      grid[di][hi] = +r.revenue_cents;
    });
    const max = Math.max(1, ...grid.flat());
    let cells = "";
    grid.forEach((row, di) => {
      row.forEach((v, hi) => {
        const x = padL + hi * cellW;
        const y = padT + di * cellH;
        const t = v / max;
        const fill = v === 0 ? "#f3eedb" : `rgba(31, 74, 46, ${0.12 + t * 0.78})`;
        cells += `<rect x="${x}" y="${y}" width="${cellW - 1}" height="${cellH - 1}" fill="${fill}" rx="2">
          <title>${days[di]} ${hi}:00 → ${fmtEUR(v)}</title>
        </rect>`;
      });
    });
    let yLabels = days.map((d, i) =>
      `<text x="${padL - 6}" y="${padT + i * cellH + cellH / 2 + 4}" font-size="11" fill="#7c726a" text-anchor="end">${d}</text>`
    ).join("");
    let xLabels = "";
    [0, 6, 12, 18, 23].forEach((h) => {
      xLabels += `<text x="${padL + h * cellW + cellW / 2}" y="${H - 8}" font-size="10" fill="#7c726a" text-anchor="middle">${h}h</text>`;
    });
    svg.innerHTML = cells + yLabels + xLabels;
  }

  function bindStatsPanel() {
    const picker = document.getElementById("statsRangePicker");
    if (!picker) return;
    picker.addEventListener("click", (e) => {
      const b = e.target.closest("[data-stats-range]");
      if (!b) return;
      statsRange = parseInt(b.dataset.statsRange, 10);
      picker.querySelectorAll(".seg__btn").forEach((x) => x.classList.toggle("is-active", x === b));
      renderStatsPanel();
    });
  }

  // ====================================================================
  // ============== CONSUMPTION PANEL (manual logging) ==================
  // ====================================================================
  let consDishesCache = null;
  let consAuthToken = null;

  function ensureConsAuthToken() {
    // Token de sesión Supabase Auth real (admin logueado vía email+password).
    if (!window.cbBackend || !window.cbBackend.getSession) return "";
    const s = window.cbBackend.getSession();
    return s ? s.access_token : "";
  }

  function renderConsumptionPanel() {
    if (!window.cbBackend) return;
    const recent = document.getElementById("consumptionRecent");
    if (recent) recent.innerHTML = `<p class="muted-sm">Cargando últimos consumos…</p>`;
    window.cbBackend.fetchRecentConsumption({ limit: 50 }).then((rows) => {
      if (!recent) return;
      if (!rows.length) {
        recent.innerHTML = `<p class="muted-sm">Aún no hay consumos registrados.</p>`;
        return;
      }
      recent.innerHTML = `
        <h4>Últimos ${rows.length} consumos</h4>
        <table class="cons-table">
          <thead>
            <tr><th>Hora</th><th>Plato</th><th>Cant.</th><th>Turno</th><th>Total</th><th>Mesa</th></tr>
          </thead>
          <tbody>${rows.map((r) => `
            <tr>
              <td>${new Date(r.served_at).toLocaleString(state.lang === "es" ? "es-ES" : "en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</td>
              <td>${escapeHtml(r.dish_title)}</td>
              <td>${r.quantity}</td>
              <td>${escapeHtml(r.shift)}</td>
              <td>${fmtEUR(+r.total_cents)}</td>
              <td>${escapeHtml(r.table_label || "—")}</td>
            </tr>
          `).join("")}</tbody>
        </table>`;
    });

    // Poblar select de platos
    if (!consDishesCache) {
      window.cbBackend.fetchDishes().then((rows) => {
        consDishesCache = rows;
        const sel = document.getElementById("consDish");
        if (sel) {
          sel.innerHTML = rows.map((d) =>
            `<option value="${d.id}" data-price="${d.base_price_cents}" data-title="${escapeHtml(d.title_es)}" data-cat="${d.category}">${escapeHtml(d.title_es)} · ${fmtEUR(d.base_price_cents)}</option>`
          ).join("");
        }
      });
    }
  }

  function bindConsumptionPanel() {
    document.getElementById("consumptionAddBtn")?.addEventListener("click", () => {
      const f = document.getElementById("consumptionForm");
      if (f) f.hidden = false;
    });
    document.getElementById("consCancelBtn")?.addEventListener("click", () => {
      const f = document.getElementById("consumptionForm");
      if (f) f.hidden = true;
    });
    document.getElementById("consumptionWipeDemo")?.addEventListener("click", async () => {
      if (!confirm(state.lang === "es"
        ? "¿Borrar las 950 ventas demo? Esto despeja el panel de stats para que arranques con datos REALES."
        : "Wipe the 950 demo sales? This clears the stats panel so you start with REAL data.")) return;
      if (!window.cbBackend || !window.cbBackend.getSession()) {
        toast(state.lang === "es" ? "Necesitás estar logueado como admin." : "Login as admin first.");
        return;
      }
      try {
        await window.cbBackend.wipeDemoConsumption();
        toast(state.lang === "es" ? "Demo data borrada ✓" : "Demo data wiped ✓");
        renderConsumptionPanel();
        if (state.dashTab === "stats") renderStatsPanel();
      } catch (e) {
        console.warn("wipe failed", e);
        toast("Error al borrar (¿permisos?). Revisá la consola.");
      }
    });
    document.getElementById("consSaveBtn")?.addEventListener("click", () => {
      const sel = document.getElementById("consDish");
      const opt = sel?.options[sel.selectedIndex];
      if (!opt) return;
      const qty = Math.max(1, parseInt(document.getElementById("consQty").value, 10) || 1);
      const price = parseInt(opt.dataset.price, 10);
      const entry = {
        dish_id: opt.value,
        dish_title: opt.dataset.title,
        category: opt.dataset.cat,
        quantity: qty,
        unit_price_cents: price,
        total_cents: price * qty,
        shift: document.getElementById("consShift").value,
        table_label: document.getElementById("consTable").value.trim(),
        source: "manual"
      };
      const token = ensureConsAuthToken();
      window.cbBackend.logConsumption([entry], token)
        .then(() => {
          toast(state.lang === "es" ? "Consumo registrado ✓" : "Logged ✓");
          document.getElementById("consumptionForm").hidden = true;
          renderConsumptionPanel();
        })
        .catch((err) => {
          console.warn("log failed", err);
          toast(state.lang === "es"
            ? "Error al guardar (¿permisos?). Revisá la consola."
            : "Save failed (permissions?). Check console.");
        });
    });
  }

  // ====================================================================
  // ============== BACKUP CMS (export / import / clear) ================
  // ====================================================================
  const BACKUP_KEYS = [
    "cb_content_v1",
    "cb_reservations_v1",
    "cb.images.v1",
    "cb.bpic.wall.v1",
    "cb_bpic_wall_v1",
    "cb.crew.v1",
    "cb.ig.feed.v1",
    "cb.customers.v1",
    "cb.cookies.v1",
    "cb.design.v1",
    "cb.payments.v1",
    "cb.pet.gallery.v1",
    "cb.pet.count.v1",
    "cb.googleReview.v1"
  ];

  function buildBackupSnapshot() {
    const snap = { exportedAt: new Date().toISOString(), site: "capitan-beto", version: "v40", data: {} };
    BACKUP_KEYS.forEach((k) => {
      try {
        const v = localStorage.getItem(k);
        if (v != null) snap.data[k] = v;
      } catch (_) {}
    });
    return snap;
  }

  function renderBackupPanel() {
    const wrap = document.getElementById("backupStats");
    if (!wrap) return;
    const snap = buildBackupSnapshot();
    const sizeBytes = new Blob([JSON.stringify(snap)]).size;
    const sizeKb = (sizeBytes / 1024).toFixed(1);
    const filled = Object.keys(snap.data).length;
    wrap.innerHTML = `
      <div class="backup-stat"><strong>${filled}</strong><small>${state.lang === "es" ? "Claves con datos" : "Stored keys"}</small></div>
      <div class="backup-stat"><strong>${sizeKb} KB</strong><small>${state.lang === "es" ? "Tamaño del backup" : "Backup size"}</small></div>
      <div class="backup-stat"><strong>${new Date().toLocaleDateString(state.lang === "es" ? "es-ES" : "en-GB")}</strong><small>${state.lang === "es" ? "Última snapshot" : "Last snapshot"}</small></div>
    `;
  }

  function bindBackupPanel() {
    document.getElementById("backupExportBtn")?.addEventListener("click", () => {
      const snap = buildBackupSnapshot();
      const blob = new Blob([JSON.stringify(snap, null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      const stamp = new Date().toISOString().slice(0, 10);
      a.href = URL.createObjectURL(blob);
      a.download = `capitan-beto-backup-${stamp}.json`;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      toast(state.lang === "es" ? "Backup descargado ✓" : "Backup downloaded ✓");
    });

    document.getElementById("backupImportInput")?.addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const r = new FileReader();
      r.onload = (ev) => {
        try {
          const snap = JSON.parse(ev.target.result);
          if (!snap || !snap.data) throw new Error("formato_invalido");
          if (!confirm(state.lang === "es"
            ? `¿Restaurar ${Object.keys(snap.data).length} claves del backup? Sobrescribe lo actual.`
            : `Restore ${Object.keys(snap.data).length} keys from backup? Overwrites current data.`)) return;
          Object.entries(snap.data).forEach(([k, v]) => {
            try { localStorage.setItem(k, v); } catch (_) {}
          });
          toast(state.lang === "es" ? "Backup restaurado · recargando..." : "Backup restored · reloading...");
          setTimeout(() => location.reload(), 800);
        } catch (err) {
          toast(state.lang === "es" ? "Archivo inválido" : "Invalid file");
        }
      };
      r.readAsText(file);
    });

    document.getElementById("backupClearBtn")?.addEventListener("click", () => {
      if (!confirm(state.lang === "es"
        ? "¿Borrar TODO el contenido editado? Esta acción no se puede deshacer."
        : "Delete ALL edited content? This cannot be undone.")) return;
      if (!confirm(state.lang === "es" ? "Confirmá una vez más: borrar todo." : "Confirm once more: delete everything.")) return;
      BACKUP_KEYS.forEach((k) => { try { localStorage.removeItem(k); } catch (_) {} });
      toast(state.lang === "es" ? "Contenido borrado · recargando..." : "Content cleared · reloading...");
      setTimeout(() => location.reload(), 800);
    });
  }

  // ====================================================================
  // ============== DESIGN PANEL (live theme editor) ====================
  // ====================================================================
  const DESIGN_KEY = "cb.design.v1";
  const DESIGN_DEFAULTS = {
    "--brand-green": "#1F4A2E",
    "--brand-green-deep": "#173823",
    "--sunset": "#C9612F",
    "--brass": "#C5A050",
    "--bg-cream": "#F7EFDC",
    "--ink": "#1A1A1A",
    "--font-base-size": "16",
    "--radius-md": "14",
    "--radius-lg": "22"
  };
  function loadDesign() {
    try { return JSON.parse(localStorage.getItem(DESIGN_KEY) || "{}"); }
    catch (_) { return {}; }
  }
  function persistDesign(d) {
    try { localStorage.setItem(DESIGN_KEY, JSON.stringify(d)); } catch (_) {}
  }
  function applyDesignFromStorage() {
    const d = loadDesign();
    const root = document.documentElement;
    Object.keys(DESIGN_DEFAULTS).forEach((k) => {
      const v = d[k];
      if (v == null || v === "") return;
      if (k === "--font-base-size" || k === "--radius-md" || k === "--radius-lg") {
        root.style.setProperty(k, v + "px");
      } else {
        root.style.setProperty(k, v);
      }
    });
  }
  function renderDesignPanel() {
    const d = loadDesign();
    document.querySelectorAll("[data-design-var]").forEach((el) => {
      const k = el.getAttribute("data-design-var");
      if (d[k]) el.value = d[k];
    });
    document.querySelectorAll("[data-design-var-text]").forEach((el) => {
      const k = el.getAttribute("data-design-var-text");
      if (d[k]) el.value = d[k];
    });
    document.querySelectorAll("[data-design-num]").forEach((el) => {
      const k = el.getAttribute("data-design-num");
      if (d[k]) el.value = d[k];
    });
  }
  function bindDesignPanel() {
    // Live preview SOLO dentro del panel de diseño — antes corría en
    // CADA input del sitio (incluido reservas, búsqueda, etc.) y causaba
    // re-styles innecesarios.
    const panel = document.querySelector('[data-dash-panel="design"]');
    if (!panel) return;
    panel.addEventListener("input", (e) => {
      const cv = e.target.closest("[data-design-var]");
      if (cv) {
        const k = cv.getAttribute("data-design-var");
        document.documentElement.style.setProperty(k, cv.value);
        const txt = panel.querySelector(`[data-design-var-text="${k}"]`);
        if (txt) txt.value = cv.value;
        return;
      }
      const tv = e.target.closest("[data-design-var-text]");
      if (tv) {
        const k = tv.getAttribute("data-design-var-text");
        if (/^#[0-9a-f]{6}$/i.test(tv.value)) {
          document.documentElement.style.setProperty(k, tv.value);
          const cv2 = panel.querySelector(`[data-design-var="${k}"]`);
          if (cv2) cv2.value = tv.value;
        }
        return;
      }
      const nv = e.target.closest("[data-design-num]");
      if (nv) {
        const k = nv.getAttribute("data-design-num");
        const v = parseFloat(nv.value);
        if (!isNaN(v)) document.documentElement.style.setProperty(k, v + "px");
      }
    });

    document.getElementById("designColorsSave")?.addEventListener("click", () => {
      const d = loadDesign();
      document.querySelectorAll("[data-design-var]").forEach((el) => {
        d[el.getAttribute("data-design-var")] = el.value;
      });
      persistDesign(d);
      toast(state.lang === "es" ? "Paleta guardada ✓" : "Palette saved ✓");
    });
    document.getElementById("designTypoSave")?.addEventListener("click", () => {
      const d = loadDesign();
      document.querySelectorAll("[data-design-num]").forEach((el) => {
        d[el.getAttribute("data-design-num")] = el.value;
      });
      persistDesign(d);
      toast(state.lang === "es" ? "Tipografía guardada ✓" : "Typography saved ✓");
    });
    document.getElementById("designColorsReset")?.addEventListener("click", () => {
      if (!confirm(state.lang === "es" ? "¿Resetear paleta a defaults?" : "Reset palette to defaults?")) return;
      const d = loadDesign();
      Object.keys(DESIGN_DEFAULTS).forEach((k) => {
        if (k.startsWith("--brand") || k === "--sunset" || k === "--brass" || k === "--bg-cream" || k === "--ink") {
          delete d[k];
          document.documentElement.style.removeProperty(k);
        }
      });
      persistDesign(d);
      renderDesignPanel();
      toast("Paleta reseteada");
    });
    document.getElementById("designTypoReset")?.addEventListener("click", () => {
      const d = loadDesign();
      ["--font-base-size", "--radius-md", "--radius-lg"].forEach((k) => {
        delete d[k];
        document.documentElement.style.removeProperty(k);
      });
      persistDesign(d);
      renderDesignPanel();
      toast("Tipografía reseteada");
    });
  }

  // ====================================================================
  // ============== PAYMENTS & INTEGRATIONS PANEL =======================
  // ====================================================================
  const PAYMENTS_KEY = "cb.payments.v1";
  function loadPayments() {
    try { return JSON.parse(localStorage.getItem(PAYMENTS_KEY) || "{}"); }
    catch (_) { return {}; }
  }
  function persistPayments(p) {
    try { localStorage.setItem(PAYMENTS_KEY, JSON.stringify(p)); } catch (_) {}
  }
  function renderPaymentsPanel() {
    const p = loadPayments();
    let active = 0;
    document.querySelectorAll("[data-pay-enabled]").forEach((cb) => {
      const id = cb.getAttribute("data-pay-enabled");
      cb.checked = !!(p[id] && p[id].enabled);
      if (cb.checked) active++;
      cb.closest(".pay-card")?.classList.toggle("pay-card--on", cb.checked);
    });
    document.querySelectorAll("[data-pay-field]").forEach((el) => {
      const [id, field] = el.getAttribute("data-pay-field").split(".");
      const v = p[id] && p[id][field];
      if (v != null) el.value = v;
    });
    const count = document.getElementById("payActiveCount");
    if (count) count.textContent = active;
  }
  function bindPaymentsPanel() {
    // Limitamos al panel — los listeners globales costaban en cada click/change.
    const panel = document.querySelector('[data-dash-panel="payments"]');
    if (!panel) return;
    panel.addEventListener("change", (e) => {
      const cb = e.target.closest("[data-pay-enabled]");
      if (!cb) return;
      const id = cb.getAttribute("data-pay-enabled");
      const p = loadPayments();
      if (!p[id]) p[id] = {};
      p[id].enabled = cb.checked;
      persistPayments(p);
      cb.closest(".pay-card")?.classList.toggle("pay-card--on", cb.checked);
      renderPaymentsPanel();
      toast(state.lang === "es"
        ? `${id} ${cb.checked ? "activado" : "desactivado"}`
        : `${id} ${cb.checked ? "enabled" : "disabled"}`);
    });
    panel.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-pay-save]");
      if (!btn) return;
      const id = btn.getAttribute("data-pay-save");
      const p = loadPayments();
      if (!p[id]) p[id] = {};
      panel.querySelectorAll(`[data-pay-field^="${id}."]`).forEach((el) => {
        const field = el.getAttribute("data-pay-field").split(".")[1];
        p[id][field] = el.value;
      });
      persistPayments(p);
      toast(state.lang === "es"
        ? `Config de ${id} guardada ✓`
        : `${id} config saved ✓`);
    });
  }

  // ====================================================================
  // ============== DASHBOARD ONBOARDING TOUR ===========================
  // ====================================================================
  const TOUR_SLIDES = [
    {
      icon: "👋", title: { es: "Bienvenido al backoffice", en: "Welcome to the backoffice" },
      body: { es: "Acá controlás <strong>todo</strong> de Capitán Beto: menú, fotos, reservas, clientes, diseño y pagos. Te muestro cada panel en 60 segundos.", en: "Here you control <strong>everything</strong> about Capitán Beto: menu, photos, reservations, customers, design and payments. Let me show you each panel in 60 seconds." },
      target: ".sidebar__brand"
    },
    {
      icon: "📋", title: { es: "Inventario · 96 platos reales", en: "Inventory · 96 real dishes" },
      body: { es: "Editás precios, marcás stock, agregás nuevos. Cada cambio se aplica al instante en el sitio público.", en: "Edit prices, toggle stock, add new dishes. Every change applies instantly to the public site." },
      target: '[data-dash-tab="inventory"]'
    },
    {
      icon: "✏️", title: { es: "Contenido editable", en: "Editable content" },
      body: { es: "Cambiás cualquier texto del sitio sin tocar código: hero, crew, footer. Hasta el menú lo editás con click directo en cada plato.", en: "Change any text on the site without touching code: hero, crew, footer. Even edit dishes with one click." },
      target: '[data-dash-tab="content"]'
    },
    {
      icon: "🖼️", title: { es: "Manager de imágenes", en: "Image manager" },
      body: { es: "Drag-and-drop para reemplazar fotos del crew, momentos del bar, hero. Acepta JPG, PNG, HEIC del iPhone, WebP. Auto-compresión a 1400px.", en: "Drag-and-drop to replace crew photos, bar moments, hero. Accepts JPG, PNG, HEIC from iPhone, WebP. Auto-compressed to 1400px." },
      target: '[data-dash-tab="images"]'
    },
    {
      icon: "🗓️", title: { es: "Reservas en vivo", en: "Live reservations" },
      body: { es: "Las reservas que hacen los clientes desde el sitio aparecen acá <strong>al instante</strong>, sincronizadas con Supabase. Cancelás o marcás cumplidas con un click.", en: "Customer reservations appear here <strong>instantly</strong>, synced with Supabase. Cancel or mark as completed with one click." },
      target: '[data-dash-tab="reservations"]'
    },
    {
      icon: "👤", title: { es: "Base de clientes (CRM)", en: "Customer base (CRM)" },
      body: { es: "Cada lead se guarda en Supabase. Mandás email/WhatsApp masivo a los que opt-in. Es tu newsletter gratuita.", en: "Every lead is saved in Supabase. Send mass email/WhatsApp to opt-in customers. Your free newsletter." },
      target: '[data-dash-tab="customers"]'
    },
    {
      icon: "🐾", title: { es: "Peludos del Capitán", en: "Captain's furry friends" },
      body: { es: "Las fotos de mascotas que suben tus clientes aparecen acá. Borrás las inapropiadas con un click. El resto se ve en la galería pública con su nota de agradecimiento.", en: "Pet photos uploaded by customers appear here. Delete inappropriate ones with one click. The rest show in the public gallery with their thank-you note." },
      target: '[data-dash-tab="pets"]'
    },
    {
      icon: "📸", title: { es: "Muro #BetosPic", en: "#BetosPic Wall" },
      body: { es: "Comunidad de fotos del bar. Mismo flow de moderación que peludos.", en: "Bar photo community. Same moderation flow as pets." },
      target: '[data-dash-tab="wall"]'
    },
    {
      icon: "🔥", title: { es: "Promociones LIVE", en: "LIVE Promotions" },
      body: { es: "Activás ofertas en tiempo real (happy hour, 2x1, etc.). Aparecen con un dot pulsante en la sección \"Pizarra del día\" del sitio.", en: "Activate real-time deals (happy hour, 2-for-1, etc.). They appear with a pulsing dot in the site's \"Today's slate\" section." },
      target: '[data-dash-tab="promos"]'
    },
    {
      icon: "🕒", title: { es: "Horarios y turnos", en: "Hours & shifts" },
      body: { es: "Doble turno madrileño: comidas + cenas. Cerrás un día, cambiás horarios, todo se refleja en el footer del sitio.", en: "Madrid double shift: lunch + dinner. Close a day, change hours, all reflects on the site footer." },
      target: '[data-dash-tab="hours"]'
    },
    {
      icon: "📡", title: { es: "Canales de contacto", en: "Contact channels" },
      body: { es: "Conectás WhatsApp, Instagram, Google Reseñas. Las reservas también se mandan por email vía FormSubmit + Google Calendar.", en: "Connect WhatsApp, Instagram, Google Reviews. Reservations are also sent via email through FormSubmit + Google Calendar." },
      target: '[data-dash-tab="channels"]'
    },
    {
      icon: "🐾", title: { es: "🎨 Diseño en vivo", en: "🎨 Live design" },
      body: { es: "Cambiás colores de marca, tipografía, tamaño de tarjetas. La paleta se actualiza al instante mientras arrastrás los color pickers.", en: "Change brand colors, typography, card sizes. Palette updates instantly while you drag the color pickers." },
      target: '[data-dash-tab="design"]'
    },
    {
      icon: "💳", title: { es: "Pagos & Integraciones", en: "Payments & Integrations" },
      body: { es: "Stripe, Redsys, PayPal, Bizum, CoverManager, TheFork, Mailchimp y Google Analytics. Activás los que querés, pegás las claves, listo.", en: "Stripe, Redsys, PayPal, Bizum, CoverManager, TheFork, Mailchimp and Google Analytics. Enable the ones you need, paste the keys, done." },
      target: '[data-dash-tab="payments"]'
    },
    {
      icon: "💾", title: { es: "Backup CMS", en: "CMS Backup" },
      body: { es: "Exportás TODO el contenido editado como JSON (textos, imágenes, configs). Restaurás en otro navegador o tras reset. Es tu seguro.", en: "Export ALL edited content as JSON (texts, images, configs). Restore in another browser or after reset. Your safety net." },
      target: '[data-dash-tab="backup"]'
    },
    {
      icon: "🎉", title: { es: "¡Listo!", en: "All set!" },
      body: { es: "Ya conocés todo. Tu sitio está en <strong>https://capitan-beto.com</strong> con backend Supabase real, SSL automático y deploy continuo desde GitHub. Cualquier duda, contactanos.", en: "You know it all now. Your site is at <strong>https://capitan-beto.com</strong> with real Supabase backend, automatic SSL and continuous deploy from GitHub. Reach out anytime." },
      target: ".sidebar__brand",
      isFinal: true
    }
  ];

  let tourState = { idx: 0, overlay: null };

  function startDashboardTour() {
    if (state.view !== "dashboard") setView("dashboard");
    if (tourState.overlay) tourState.overlay.remove();
    tourState.idx = 0;
    const ov = document.createElement("div");
    ov.className = "tour-overlay";
    ov.innerHTML = `
      <div class="tour-spot" id="tourSpot"></div>
      <div class="tour-card" id="tourCard">
        <button class="tour-close" id="tourSkip" aria-label="Skip">×</button>
        <div class="tour-icon" id="tourIcon"></div>
        <h3 class="tour-title" id="tourTitle"></h3>
        <div class="tour-body" id="tourBody"></div>
        <div class="tour-foot">
          <div class="tour-dots" id="tourDots"></div>
          <div class="tour-actions">
            <button class="btn btn--ghost btn--sm" id="tourPrev">${state.lang === "es" ? "← Anterior" : "← Back"}</button>
            <button class="btn btn--primary btn--sm" id="tourNext">${state.lang === "es" ? "Siguiente →" : "Next →"}</button>
          </div>
        </div>
      </div>`;
    document.body.appendChild(ov);
    tourState.overlay = ov;
    ov.querySelector("#tourSkip").addEventListener("click", endDashboardTour);
    ov.querySelector("#tourPrev").addEventListener("click", () => goTourSlide(tourState.idx - 1));
    ov.querySelector("#tourNext").addEventListener("click", () => {
      const slide = TOUR_SLIDES[tourState.idx];
      if (slide && slide.isFinal) endDashboardTour();
      else goTourSlide(tourState.idx + 1);
    });
    goTourSlide(0);
  }
  function goTourSlide(idx) {
    if (idx < 0) idx = 0;
    if (idx >= TOUR_SLIDES.length) idx = TOUR_SLIDES.length - 1;
    tourState.idx = idx;
    const s = TOUR_SLIDES[idx];
    const ov = tourState.overlay;
    if (!ov || !s) return;
    ov.querySelector("#tourIcon").textContent = s.icon || "✨";
    ov.querySelector("#tourTitle").textContent = s.title[state.lang] || s.title.es;
    ov.querySelector("#tourBody").innerHTML = s.body[state.lang] || s.body.es;
    // Dots
    const dots = ov.querySelector("#tourDots");
    dots.innerHTML = TOUR_SLIDES.map((_, i) =>
      `<button class="tour-dot ${i === idx ? "is-active" : ""}" data-tour-go="${i}" aria-label="Slide ${i+1}"></button>`
    ).join("");
    dots.querySelectorAll("[data-tour-go]").forEach((d) =>
      d.addEventListener("click", () => goTourSlide(parseInt(d.dataset.tourGo, 10)))
    );
    // Prev/Next labels
    const prev = ov.querySelector("#tourPrev");
    const next = ov.querySelector("#tourNext");
    prev.style.visibility = idx === 0 ? "hidden" : "visible";
    if (s.isFinal) {
      next.textContent = state.lang === "es" ? "Empezar a usar 🚀" : "Start using 🚀";
    } else {
      next.textContent = state.lang === "es" ? "Siguiente →" : "Next →";
    }
    // Highlight target element
    const spot = ov.querySelector("#tourSpot");
    const target = s.target ? document.querySelector(s.target) : null;
    if (target) {
      const r = target.getBoundingClientRect();
      const pad = 6;
      spot.style.display = "block";
      spot.style.top = (r.top + window.scrollY - pad) + "px";
      spot.style.left = (r.left + window.scrollX - pad) + "px";
      spot.style.width = (r.width + pad*2) + "px";
      spot.style.height = (r.height + pad*2) + "px";
      // scroll into view
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      spot.style.display = "none";
    }
  }
  function endDashboardTour() {
    if (tourState.overlay) { tourState.overlay.remove(); tourState.overlay = null; }
    try { localStorage.setItem("cb.tour.seen", "1"); } catch (_) {}
  }
  // Botón flotante "Tour" en el dashboard para reabrirlo
  window.cbStartTour = startDashboardTour;


  // ====================================================================
  // ============== SUPABASE MENU SYNC ==================================
  // Carga stock y precios en vivo desde la tabla `dishes` de Supabase.
  // Si el fetch falla, el menú hardcodeado sigue funcionando sin cambios.
  // ====================================================================
  function syncMenuFromSupabase() {
    if (!window.cbBackend || typeof window.cbBackend.fetchDishes !== "function") return;
    window.cbBackend.fetchDishes().then((rows) => {
      if (!Array.isArray(rows) || !rows.length) return;

      // Construir mapa por id para lookup O(1)
      const byId = {};
      rows.forEach((r) => { byId[r.id] = r; });

      let changed = false;
      DISHES.forEach((d, i) => {
        const r = byId[d.id];
        if (!r) return;
        // Actualizar stock en vivo
        const newStock = r.in_stock !== false;
        if (d.stock !== newStock) { DISHES[i] = Object.assign({}, d, { stock: newStock }); changed = true; }
        // Actualizar precios si vienen en Supabase (base_price_cents > 0)
        if (r.base_price_cents > 0) {
          const newBase = r.base_price_cents / 100;
          const newTerr = (r.terrace_price_cents || r.base_price_cents) / 100;
          if (d.base !== newBase || d.terr !== newTerr) {
            DISHES[i] = Object.assign({}, DISHES[i], { base: newBase, terr: newTerr });
            changed = true;
          }
        }
      });

      if (changed) {
        renderPublicMenu(false);
        console.info("[cbMenu] Menú sincronizado desde Supabase ✓");
      }
    }).catch((e) => {
      console.warn("[cbMenu] Sync falló, usando datos locales:", e.message);
    });
  }

  document.removeEventListener("DOMContentLoaded", __origInit);
  document.addEventListener("DOMContentLoaded", init);
})();
