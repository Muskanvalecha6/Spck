console.log('Hello World!');
let currentRecordCount = 0;

    const defaultConfig = {
      background_color: '#f8fafc',
      text_color: '#1e3a8a',
      accent_color: '#0ea5e9',
      secondary_accent: '#06b6d4',
      hero_headline: 'Bridging the Gap Between Code and Classroom.',
      hero_subheadline: 'MCA Graduate | Computer Science Educator | AWS Cloud Practitioner.',
      about_text: 'I\'m passionate about democratizing digital literacy and empowering students through innovative teaching methodologies. With a Master\'s in Computer Applications (MCA) and experience spanning custom software development and cloud deployment, I bridge the gap between theoretical computer science and practical implementation. My journey has taken me from developing enterprise solutions at Trigya Innovation to shaping the next generation of technologists in the classroom. I hold an AWS Cloud Practitioner certification and have hands-on experience with WordPress and AWS deployment through my work at Magic Bus Foundation.',
      contact_email: 'muskanvalecha805@gmail.com',
      contact_location: 'Sonipat, Haryana'
    };

    const dataHandler = {
      onDataChanged(data) {
        currentRecordCount = data.length;
      }
    };

    async function initData() {
      const result = await window.dataSdk.init(dataHandler);
      if (!result.isOk) {
        console.error('Data SDK init failed');
      }
    }

    function applyConfig(config) {
      const c = { ...defaultConfig, ...config };
      
      // Text content updates
      document.getElementById('hero-headline').textContent = c.hero_headline;
      document.getElementById('hero-subheadline').textContent = c.hero_subheadline;
      document.getElementById('about-text').textContent = c.about_text;
      document.getElementById('contact-email').textContent = c.contact_email;
      document.getElementById('contact-location').textContent = c.contact_location;

      // Color updates
      const accentColor = c.accent_color || defaultConfig.accent_color;
      const secAccent = c.secondary_accent || defaultConfig.secondary_accent;
      
      document.querySelectorAll('[style*="color: #0ea5e9"]').forEach(el => {
        if (el.style.color === 'rgb(14, 165, 233)') el.style.color = accentColor;
      });
      
      document.querySelectorAll('[style*="background: #0ea5e9"]').forEach(el => {
        if (el.style.background === 'rgb(14, 165, 233)') el.style.background = accentColor;
      });
    }

    window.elementSdk.init({
      defaultConfig,
      onConfigChange: async (config) => {
        applyConfig(config);
      },
      mapToCapabilities: (config) => ({
        recolorables: [
          {
            get: () => config.background_color || defaultConfig.background_color,
            set: (v) => { config.background_color = v; window.elementSdk.setConfig({ background_color: v }); }
          },
          {
            get: () => config.text_color || defaultConfig.text_color,
            set: (v) => { config.text_color = v; window.elementSdk.setConfig({ text_color: v }); }
          },
          {
            get: () => config.accent_color || defaultConfig.accent_color,
            set: (v) => { config.accent_color = v; window.elementSdk.setConfig({ accent_color: v }); }
          },
          {
            get: () => config.secondary_accent || defaultConfig.secondary_accent,
            set: (v) => { config.secondary_accent = v; window.elementSdk.setConfig({ secondary_accent: v }); }
          }
        ],
        borderables: [],
        fontEditable: undefined,
        fontSizeable: undefined
      }),
      mapToEditPanelValues: (config) => new Map([
        ['hero_headline', config.hero_headline || defaultConfig.hero_headline],
        ['hero_subheadline', config.hero_subheadline || defaultConfig.hero_subheadline],
        ['about_text', config.about_text || defaultConfig.about_text],
        ['contact_email', config.contact_email || defaultConfig.contact_email],
        ['contact_location', config.contact_location || defaultConfig.contact_location]
      ])
    });

    // Initialize data SDK
    initData();

    // Contact form handling
    document.getElementById('contact-form').addEventListener('submit', async (e) => {
      e.preventDefault();

      if (currentRecordCount >= 999) {
        const statusEl = document.getElementById('form-status');
        statusEl.textContent = '❌ Message limit reached. Please try again later.';
        statusEl.style.background = '#fee2e2';
        statusEl.style.color = '#991b1b';
        statusEl.style.display = 'block';
        return;
      }

      const submitBtn = document.getElementById('submit-btn');
      const statusEl = document.getElementById('form-status');
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="loading-spinner"></span>';

      const result = await window.dataSdk.create({
        id: Date.now().toString(),
        name,
        email,
        message,
        submitted_at: new Date().toISOString()
      });

      if (result.isOk) {
        statusEl.textContent = '✓ Message sent successfully!';
        statusEl.style.background = '#dcfce7';
        statusEl.style.color = '#166534';
        document.getElementById('contact-form').reset();
      } else {
        statusEl.textContent = '✗ Failed to send message. Please try again.';
        statusEl.style.background = '#fee2e2';
        statusEl.style.color = '#991b1b';
      }

      statusEl.style.display = 'block';
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Send Message';

      setTimeout(() => {
        statusEl.style.display = 'none';
      }, 5000);
    });

    lucide.createIcons();
  </script>
 <script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9e05f04dc4e74e88',t:'MTc3NDE5MDI5Mi4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();
