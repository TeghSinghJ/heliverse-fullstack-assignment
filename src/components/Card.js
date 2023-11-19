import React from 'react'

const Card = (props) => {
    const {username,imgUrl,domain,email,status,onCheckboxChange, isChecked} = props;
    return (
        <div className='col mb-4'>
             <div className="card" style={{width:"18rem"}}>
             <input type="checkbox" checked={isChecked} onChange={onCheckboxChange} />
                <img src={imgUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{username} <span class={`badge bg-${status==true?"success":"danger"}`}>{status==true?"Available": "Not Available"}</span></h5>
                    <p className="card-text">{email}</p>
                    <p className="card-text">{domain}</p>
                </div>
            </div>
        </div>
    )
}

export default Card
