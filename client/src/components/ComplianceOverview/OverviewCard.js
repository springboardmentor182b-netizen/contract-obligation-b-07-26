import "./OverviewCard.css";

function OverviewCard({

    title,

    value,

    subtitle,

    icon,

    bgColor,

    iconColor

}){

    return(

        <div className="overview-card">

            <div className="card-top">

                <div
                    className="overview-icon"
                    style={{background:bgColor}}
                >

                    <div
                        style={{color:iconColor}}
                    >

                        {icon}

                    </div>

                </div>

                <h2>

                    {value}

                </h2>

            </div>

            <h3>

                {title}

            </h3>

            <p>

                {subtitle}

            </p>

        </div>

    );

}

export default OverviewCard;
