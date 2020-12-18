import React from "react"

const ImageCard = ({source, title, desc}) => {

    return (
        <div style={{gridRowEnd: `span 2`}}>
                <div class="ui card">
                    <div class="image">
                        <img src={source} />
                    </div>
                    <div class="content">
                        <a class="header">{title}</a>
                        <div class="description">{desc}</div>
                    </div>
                </div>
        </div>

    )
}

export default ImageCard
