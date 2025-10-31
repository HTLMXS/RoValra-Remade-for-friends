// I dont like this script, i dont like doign stuff like this i dont like hazelnut
const style = document.createElement('style');
style.textContent = `
   
    .tab-button {
        margin-left: 10px;
        padding: 5px 10px;
        background-color: #444;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
     .tab-button:hover {
        background-color: #555;
    }
      .active-tab {
        background-color: #666;
    }
     .game-item {
        background-color: #333;
        color: white;
        padding: 10px;
        margin: 5px 0;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        transition: box-shadow 0.3s ease-in-out;
    }
    .game-name {
        display: inline-block;
    }
    .game-item:hover {
        box-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.7);
    }
    .game-item a {
        display: none;
    }
    .hidden-games-list {
        margin-top: 20px;
    }
    .rate-limited-message{
      color:red;
    }
    /* Sniper Button Styles (Dark Mode) */
    .snipe-button {
        padding: 10px 15px;
        background-color: #24292e;
        border: 1px solid #444;
        border-radius: 6px;
        cursor: pointer;
        font-size: 15px;
        font-weight: 600;
        color: white;
        flex-grow: 1;
        flex-shrink: 1;
        min-width: 50px;
        text-align: center;
        transition: background-color 0.3s ease, transform 0.3s ease;
    }
    .snipe-button:hover {
        background-color: #4c5053;
        border-color: #24292e;
        transform: scale(1.05);
    }
        /* Sniper Button Styles (Light Mode) */
    .snipe-button.light-mode {
        background-color: #e1e4e8;
         border: 1px solid #d1d5da;
        color: #24292e;
    }
     .snipe-button.light-mode:hover {
         background-color: #f0f3f6;
         border-color: #c6cbd1;
    }

    /* Confirmation Overlay Button Styles (Dark Mode)*/
    .confirm-button {
        padding: 10px 15px;
        background-color: #24292e;
        border: 1px solid #444;
        border-radius: 6px;
        cursor: pointer;
        font-size: 13.4px;
        font-weight: 600;
        color: white;
        flex-grow: 0;
        flex-shrink: 0;
        min-width: 50px;
        text-align: center;
        transition: background-color 0.3s ease, transform 0.3s ease;
        width: auto;
        border-color: #4c5053;
    }
    .confirm-button:hover {
         background-color: #4c5053;
        border-radius: 6px;
         border-color: #24292e;
        transform: scale(1.05);
    }
    .cancel-button {
        padding: 10px 15px;
        background-color: #24292e;
        border: 1px solid #444;
        border-radius: 6px;
        cursor: pointer;
        font-size: 13.4px;
        font-weight: 600;
        color: white;
         flex-grow: 0;
        flex-shrink: 0;
        min-width: 50px;
         text-align: center;
        transition: background-color 0.3s ease, transform 0.3s ease;
       width: auto;
       border-color: #4c5053;
    }
     .cancel-button:hover {
          background-color: #4c5053;
         border-radius: 6px;
          border-color: #24292e;
         transform: scale(1.05);
    }
     /* Confirmation Overlay Button Styles (Light Mode)*/
    .confirm-button.light-mode {
        background-color: #e1e4e8;
        border: 1px solid #d1d5da;
        color: #24292e;
    }
    .confirm-button.light-mode:hover {
        background-color: #f0f3f6;
        border-color: #c6cbd1;
    }
        .cancel-button.light-mode {
         background-color: #e1e4e8;
        border: 1px solid #d1d5da;
        color: #24292e;
    }
     .cancel-button.light-mode:hover {
        background-color: #f0f3f6;
        border-color: #c6cbd1;
    }
    

    :root {
        --rovalra-surface-bg: rgba(255, 255, 255, 0.95);
        --rovalra-surface-border: rgba(15, 23, 42, 0.08);
        --rovalra-text-color: rgb(57, 59, 61);
        --rovalra-header-color: rgb(40, 40, 40);
        --rovalra-muted-text: rgba(55, 65, 81, 0.75);
        --rovalra-accent: #c13ad9;
        --rovalra-card-shadow: 0 16px 32px rgba(15, 23, 42, 0.12);
        --rovalra-card-shadow-hover: 0 20px 40px rgba(15, 23, 42, 0.18);
        --rovalra-control-bg: rgba(244, 246, 249, 0.9);
        --rovalra-control-border: rgba(148, 163, 184, 0.35);
        --rovalra-status-border: rgba(148, 163, 184, 0.25);
        --rovalra-feature-bg: rgba(255, 255, 255, 0.95);
    }

    .rovalra-landing-content {
        display: flex;
        flex-direction: column;
        gap: 18px;
    }

    .rovalra-card {
        background: var(--rovalra-surface-bg);
        border: 1px solid var(--rovalra-surface-border);
        border-radius: 16px;
        padding: 20px;
        box-shadow: var(--rovalra-card-shadow);
        color: var(--rovalra-text-color);
        transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
    }

    .rovalra-card:hover {
        transform: translateY(-2px);
        box-shadow: var(--rovalra-card-shadow-hover);
    }

    .rovalra-hero-card {
        background: linear-gradient(135deg, rgba(193, 58, 217, 0.18), rgba(86, 116, 254, 0.15)), var(--rovalra-surface-bg);
    }

    .rovalra-section-header {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: 12px;
    }

    .rovalra-heading {
        font-size: 26px;
        margin: 0 0 8px 0;
        color: var(--rovalra-header-color);
    }

    .rovalra-subheading {
        font-size: 20px;
        margin: 0;
        color: var(--rovalra-header-color);
    }

    .rovalra-body {
        margin: 0;
        color: var(--rovalra-text-color);
        line-height: 1.6;
    }

    .rovalra-muted {
        color: var(--rovalra-muted-text);
        margin: 0;
        line-height: 1.6;
    }

    .rovalra-cta-row {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 16px;
    }

    .rovalra-cta-link {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 16px;
        border-radius: 999px;
        background: var(--rovalra-feature-bg);
        color: inherit;
        border: 1px solid var(--rovalra-surface-border);
        font-weight: 600;
        text-decoration: none !important;
        transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
    }

    .rovalra-cta-link:hover {
        transform: translateY(-1px);
        border-color: var(--rovalra-accent);
        box-shadow: 0 8px 18px rgba(0, 0, 0, 0.18);
    }

    .rovalra-cta-icon {
        width: 18px;
        height: 18px;
        border-radius: 4px;
    }

    .rovalra-feature-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
    }

    .rovalra-feature-card {
        border: 1px solid var(--rovalra-surface-border);
        border-radius: 14px;
        padding: 16px;
        background: var(--rovalra-feature-bg);
        transition: border-color 0.2s ease, transform 0.2s ease;
    }

    .rovalra-feature-card:hover {
        transform: translateY(-2px);
        border-color: var(--rovalra-accent);
    }

    .rovalra-feature-title {
        font-size: 16px;
        margin: 0 0 6px 0;
        color: var(--rovalra-header-color);
    }

    .rovalra-toggle-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .rovalra-toggle-item {
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 12px 14px;
        border: 1px solid var(--rovalra-surface-border);
        border-radius: 14px;
        cursor: pointer;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .rovalra-toggle-item:hover {
        border-color: var(--rovalra-accent);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
    }

    .rovalra-toggle-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
    }

    .rovalra-toggle-name {
        font-weight: 600;
        color: var(--rovalra-header-color);
    }

    .rovalra-toggle-description {
        font-size: 13px;
        color: var(--rovalra-muted-text);
    }

    .rovalra-toggle-input {
        width: 42px;
        height: 22px;
        border-radius: 999px;
        appearance: none;
        -webkit-appearance: none;
        background: var(--rovalra-control-bg);
        border: 1px solid var(--rovalra-control-border);
        position: relative;
        cursor: pointer;
        transition: background 0.2s ease, border-color 0.2s ease;
    }

    .rovalra-toggle-input::after {
        content: '';
        position: absolute;
        top: 3px;
        left: 3px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #ffffff;
        transition: transform 0.2s ease;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
    }

    .rovalra-toggle-input:checked {
        background: var(--rovalra-accent);
        border-color: var(--rovalra-accent);
    }

    .rovalra-toggle-input:checked::after {
        transform: translateX(20px);
    }

    .rovalra-status-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 12px;
    }

    .rovalra-status-card {
        border: 1px solid var(--rovalra-status-border);
        border-radius: 14px;
        padding: 14px 16px;
        display: flex;
        flex-direction: column;
        gap: 6px;
        background: var(--rovalra-feature-bg);
    }

    .rovalra-status-title {
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--rovalra-muted-text);
    }

    .rovalra-status-value {
        font-size: 20px;
        font-weight: 700;
        color: var(--rovalra-accent);
    }

    .rovalra-status-description {
        font-size: 13px;
        color: var(--rovalra-muted-text);
        line-height: 1.4;
    }

    .rovalra-credit-list {
        list-style: none;
        padding: 0;
        margin: 12px 0 0 0;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .rovalra-credit-item {
        border: 1px solid var(--rovalra-surface-border);
        border-radius: 14px;
        padding: 12px 14px;
        display: flex;
        flex-direction: column;
        gap: 4px;
        background: var(--rovalra-feature-bg);
    }

    .rovalra-credit-name {
        font-weight: 600;
        color: var(--rovalra-header-color);
    }

    .rovalra-credit-description {
        color: var(--rovalra-text-color);
        font-size: 14px;
    }

    .rovalra-inline-link {
        color: var(--rovalra-accent) !important;
        text-decoration: none !important;
        font-weight: 600;
        margin-top: 4px;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 0;
        background: transparent;
        border: none;
    }

    .rovalra-inline-link:hover {
        text-decoration: underline !important;
    }

    .rovalra-info-wrapper {
        display: flex;
        flex-direction: column;
        gap: 18px;
        background: var(--rovalra-surface-bg);
        border: 1px solid var(--rovalra-surface-border);
        border-radius: 18px;
        padding: 20px;
        box-shadow: var(--rovalra-card-shadow);
    }

    .rovalra-info-shell {
        padding: 0;
        background: transparent;
    }

    .rovalra-settings-shell {
        padding: 0;
        background: transparent;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .rovalra-settings-toolbar {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 20px;
    }

    .rovalra-settings-panel {
        padding: 5px;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    /* Region Button Styles (Dark Mode)*/
  
`;
document.head.appendChild(style);

function toggleLightMode(enable) {
    const snipeButtons = document.querySelectorAll('.snipe-button');
    const confirmButtons = document.querySelectorAll('.confirm-button');
    const cancelButtons = document.querySelectorAll('.cancel-button');
    const regionButtons = document.querySelectorAll('.region-button');
     const filterButtons = document.querySelectorAll('.filter-button');
     const filterDropdowns = document.querySelectorAll('.filter-dropdown');
     const filterDropdownOptions = document.querySelectorAll('.filter-dropdown-option')
     const filterDropdownTooltips = document.querySelectorAll('.filter-dropdown-option-tooltip');
    const buttonContainers = document.querySelectorAll(".server-buttons-container")
    const elements = [snipeButtons, confirmButtons, cancelButtons, regionButtons, filterButtons,filterDropdowns,filterDropdownOptions,filterDropdownTooltips,buttonContainers];
    elements.forEach(elementList => {
    elementList.forEach(element => {
      if (enable) {
          element.classList.add('light-mode');
      } else {
           element.classList.remove('light-mode');
      }
     });
    })
  }

(function() {
    const prefersLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;
    toggleLightMode(prefersLightMode);

    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (event) => {
        toggleLightMode(event.matches);
});
})();