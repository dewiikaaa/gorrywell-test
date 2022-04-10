<h1>Environment Set Up</h1>
<div>1. Database server is mongodb and it must have replica set</div>
<div>2. set your database configuration in config.env</div>
<div>&nbsp;</div>
<h1>Project Set Up</h1>
<div><code>npm install</code></div>
<div>&nbsp;</div>
<h1>Insert dummy Data</h1>
<div><code>node seeder.js</code></div>
<div>&nbsp;</div>
<h1>Run App</h1>
<div><code>npx nodemon app</code></div>
<div>&nbsp;</div>
<h1>EndPoint</h1>
<h4>Create Event (POST)</h4>
<ul>
<li>URL : /event/create</li>
<li>sample parameter :&nbsp;</li>
</ul>
<div style="padding-left: 40px;"><code>{</code></div>
<div style="padding-left: 40px;"><code>&nbsp; "name" : "Pelatihan Senam Kesehatan Jasmani untuk Tenaga Medis",&nbsp;</code></div>
<div style="padding-left: 40px;"><code>&nbsp; "start" : "2022-03-31T17:00:00",&nbsp;</code></div>
<div style="padding-left: 40px;"><code>&nbsp; "end" : "2022-04-01 17:00:00",&nbsp;</code></div>
<div style="padding-left: 40px;"><code>&nbsp; "location" : ID_OF_LOCATION</code></div>
<div style="padding-left: 40px;"><code>}&nbsp;</code></div>
<div>&nbsp;</div>
<ul>
<li>name, start, end are required</li>
<li>location is optional</li>
</ul>
<div>&nbsp;</div>
<h4>Create Location (POST)</h4>
<ul>
<li>URL : /location/create</li>
<li>sample parameter:</li>
</ul>
<div style="padding-left: 40px;">&nbsp; &nbsp;<code> {</code></div>
<div style="padding-left: 40px;"><code>&nbsp; &nbsp; &nbsp; &nbsp; "name": "Stadion Mahanan",</code></div>
<div style="padding-left: 40px;"><code>&nbsp; &nbsp; &nbsp; &nbsp; "city": "Solo",</code></div>
<div style="padding-left: 40px;"><code>&nbsp; &nbsp; &nbsp; &nbsp; "country": "Indonesia",</code></div>
<div style="padding-left: 40px;"><code>&nbsp; &nbsp; &nbsp; &nbsp; "lat": "-7.554983301188094",</code></div>
<div style="padding-left: 40px;"><code>&nbsp; &nbsp; &nbsp; &nbsp; "long": "110.80657631534346",</code></div>
<div style="padding-left: 40px;"><code>&nbsp; &nbsp; &nbsp;}</code></div>
<ul>
<li>&nbsp; &nbsp; &nbsp;name, city, country are required</li>
<li>&nbsp; &nbsp; &nbsp;lat, long are optional</li>
</ul>
<div>&nbsp;</div>
<h4>Create Ticket (POST)</h4>
<ul>
<li>URL : /event/ticket/create</li>
<li>Sample parameter:</li>
</ul>
<div style="padding-left: 40px;"><code>{</code></div>
<div style="padding-left: 40px;"><code>&nbsp; &nbsp;eventId : ID_OF_EVENT,</code></div>
<div style="padding-left: 40px;"><code>&nbsp; &nbsp;ticket : {</code></div>
<div style="padding-left: 40px;"><code>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;type: "GOLD,</code></div>
<div style="padding-left: 40px;"><code>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;quota:10,</code></div>
<div style="padding-left: 40px;"><code>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;price:100000</code></div>
<div style="padding-left: 40px;"><code>&nbsp; &nbsp; &nbsp; &nbsp;}</code></div>
<div style="padding-left: 40px;"><code>}</code></div>
<div>&nbsp;</div>
<ul>
<li>all parameters are required</li>
</ul>
<div>&nbsp;</div>
<h4>Get Event (GET)</h4>
<ul>
<li>Get spesific event by id =&gt; URL : /event/get_info/:id</li>
<li>Get spesific all event =&gt; URL : /event</li>
</ul>
<div>&nbsp;</div>
<h4>Purchase Ticket (POST)</h4>
<ul>
<li>URL : /transaction/purchase</li>
<li>sample paramater:</li>
</ul>
<div>&nbsp;</div>
<div>&nbsp; &nbsp;<code> {</code></div>
<div><code>&nbsp; &nbsp; &nbsp; &nbsp; "customer" :{</code></div>
<div><code>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "name" : "Dewi",</code></div>
<div><code>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "email" : "dewi@ika.com",</code></div>
<div><code>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "phone" : "6285612345678"</code></div>
<div><code>&nbsp; &nbsp; &nbsp; &nbsp; },</code></div>
<div><code>&nbsp; &nbsp; &nbsp; &nbsp; "items" :[</code></div>
<div><code>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {</code></div>
<div><code>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "qty" : 1,</code></div>
<div><code>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "ticket" : ID_OF_TICKET</code></div>
<div><code>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; },</code></div>
<div><code>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {</code></div>
<div><code>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "qty" : 2,</code></div>
<div><code>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "ticket" : ID_OF_TICKET</code></div>
<div><code>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }</code></div>
<div><code>&nbsp; &nbsp; &nbsp; &nbsp; ]</code></div>
<div><code>&nbsp; &nbsp; }</code></div>
<ul>
<li>&nbsp; &nbsp; all parameter are required</li>
</ul>
<div>&nbsp;</div>
<h4>Transaction Detail (GET)</h4>
<ul>
<li>URL : /transaction/get_info:/id</li>
</ul>
<div>&nbsp;</div>
