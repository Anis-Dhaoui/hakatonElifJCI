import React from 'react';

export const Loading = ()=>{
    return(
        <div className="container py-4 my-4">
            <div className="row justify-content-center">
                <div className="col-auto my-4">
                        <span className="fa fa-spinner fa-pulse fa-fw fa-3x text-primary"></span>
                        <p>Loading...</p>
                </div>
            </div>
        </div>
    );
};

export const LoadingOverlay = () =>{
    return(
        <div id="loader" className="" ></div>
    )
}