console.log('implementacion de websockets')
const socket = io()

const bannerEl = document.querySelector('#rebaja-banner')

socket.on('promo', ({ title, sale})  => {
    const titleEl = bannerEl.querySelector('#tile')
    const saleEl = bannerEl.querySelector('#sale')


    titleEl.innerHTML = title
    saleEl.innerHTML = `${sale}%`

    bannerEl.style.visibility = 'visible'
    bannerEl.style.display = 'block'

})