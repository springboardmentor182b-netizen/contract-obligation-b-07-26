function SummaryCard(){

return(

<div className="card border-0 shadow-sm rounded-4">

<div className="card-body">

<h5 className="fw-bold">
Today's Summary
</h5>

<hr/>

<p>
📄 12 Contracts reviewed
</p>

<p>
✅ 8 Approved
</p>

<p>
⏳ 4 Pending
</p>

<p>
⚠ 3 Expiring this week
</p>

</div>

</div>

);

}

export default SummaryCard;