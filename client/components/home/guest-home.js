import React from 'react'

class GuestHome extends React.Component {
  constructor() {
    super()
    this.state = {
      slides: [
        'beatles',
        'bob_dylan',
        'david_bowie',
        'elvis',
        'van_morrison',
        'david_byrne',
        'beach_boys'
      ],
      index: 0,
      style: {
        opacity: 1.0
      }
    }
    this.carousel = this.carousel.bind(this)
  }

  componentDidMount() {
    setInterval(this.carousel, 10)
  }

  carousel() {
    this.setState(prevState => {
      return {
        style: {
          opacity: +prevState.style.opacity - 0.001
        }
      }
    })

    if (this.state.style.opacity <= 0) {
      this.setState(prevState => {
        let newIndex =
          prevState.index >= prevState.slides.length - 1
            ? 0
            : +prevState.index + 1
        return {
          index: newIndex,
          style: {
            opacity: 1.0
          }
        }
      })
    }
  }

  render() {
    return (
      <div id="guest-home">
        <h1>Welcome!</h1>
        <div>
          <img
            id="slideshow"
            style={this.state.style}
            src={`/assets/images/${this.state.slides[this.state.index]}.gif`}
          />
        </div>
      </div>
    )
  }
}

export default GuestHome
