import { app } from '../../modules/app.js'
import { i18n } from '../../modules/i18n.js'
import { MyElement } from '../../modules/element.js'
import { css, html } from '../../modules/strings.js'

class PanelDetails extends MyElement {
  static styles = css`
    dl {
      display: grid;
      grid-template-rows: auto;
      grid-template-columns: 1.5em auto;
      row-gap: var(--space-small);
      margin: 0;

      dd {
        grid-column-start: 2;
        align-items: center;
        margin: 0;
        text-overflow: ellipsis;
        font-size: var(--type-small);
        font-weight: 500;
        line-height: var(--line-height-condensed);

        a {
          color: var(--color-link);
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  `

  static html = html`
    <dl>
      <dt title="Descripción">
        <rs-icon name="chatBubbleBottomCenterText"></rs-icon>
      </dt>
      <dd>
        <slot name="caption"></slot>
      </dd>

      <dt>
        <rs-icon name="whatsapp"></rs-icon>
      </dt>
      <dd>
        <a id="whatsapp"></a>
      </dd>

      <dt>
        <rs-icon name="arrowDownCircle"></rs-icon>
      </dt>
      <dd>
        <a download></a>
      </dd>

      <dt>
        <rs-icon name="arrowTopRightOnSquare"></rs-icon>
      </dt>
      <dd>
        <a id="link"></a>
      </dd>
    </dl>
  `

  whatsapp
  download
  link

  buildWhatsAppLink(language) {
    const { whatsapp } = app.project
    const message = whatsapp.message(window.location.href)
    const encodedMessage = encodeURIComponent(message[language])
    const url = whatsapp.url(encodedMessage)
    return url
  }

  connectedCallback() {
    this.whatsapp = this.shadowRoot?.querySelector('a#whatsapp')
    this.download = this.shadowRoot?.querySelector('a[download]')
    this.link = this.shadowRoot?.querySelector('a#link')

    i18n.push({
      'panel.whatsapp': {
        es: 'Enviar por WhatsApp',
        eu: 'Bidali WhatsApp bidez',
        en: 'Send via WhatsApp',
        fr: 'Envoyer par WhatsApp',
      },
      'panel.download': {
        es: 'Descargar imagen',
        eu: 'Irudia deskargatu',
        en: 'Download image',
        fr: 'Télécharger l’image',
      },
      'panel.link': {
        es: 'Ver #<code><slot name="id"></slot></code> en guregipuzkoa.eus',
        eu: 'Ikusi #<code><slot name="id"></slot></code> guregipuzkoa.eus-en',
        en: 'View #<code><slot name="id"></slot></code> on guregipuzkoa.eus',
        fr: 'Voir #<code><slot name="id"></slot></code> sur guregipuzkoa.eus',
      },
    })

    this.render()

    this.onLanguagechange = () => this.render()

    this.myAddEventListener(window, 'languagechange', this.onLanguagechange)
  }

  render() {
    const language = i18n.getLanguage()

    this.download.innerHTML = i18n.get('panel.download')
    this.whatsapp.innerHTML = i18n.get('panel.whatsapp')
    this.link.innerHTML = i18n.get('panel.link')

    this.whatsapp.setAttribute('href', this.buildWhatsAppLink(language))
  }

  set data(data) {
    this.innerHTML = html`
      <span slot="id">${data.id}</span>
      <span slot="caption">${data.json.summary.caption}</span>
    `

    this.download.setAttribute('href', app.project.image(data.id))
    this.link.setAttribute('href', app.project.external(data.id))
  }
}

if (!customElements.get('rs-panel-details')) {
  customElements.define('rs-panel-details', PanelDetails)
}

export { PanelDetails }
