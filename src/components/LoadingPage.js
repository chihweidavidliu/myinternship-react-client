import React from 'react'
import { Dimmer, Loader, Image } from 'semantic-ui-react'
import background from "images/internship.jpg";

const LoadingPage = () => {
  const style = { backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundPosition: "center" };
  return (
    <div>
      <div className="app-container" style={style}>
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>

        <Image src='/images/wireframe/short-paragraph.png' />
      </div>
    </div>
  )
}

export default LoadingPage;
