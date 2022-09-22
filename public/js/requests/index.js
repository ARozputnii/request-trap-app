const socket = io()
const requestsClass = document.getElementsByClassName('requests')[0]
const requests = JSON.parse(requestsClass.innerHTML)
const buildedRequests = requests.map(request => buildRequest(request))

socket.on('new-request', newRequest => {
  requestsClass.innerHTML += buildRequest(newRequest)
})

requestsClass.innerHTML = buildedRequests.join(' ')

function buildRequest (request) {
  return `<div class="accordion-item mb-3">
                <h2 class="accordion-header" id="flush-heading${request._id}">
                    <button class="accordion-button collapsed" 
                        type="button" 
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapse${request._id}" 
                        aria-expanded="false" 
                        aria-controls="flush-collapse${request._id}">
                        Request id - ${request._id}
                    </button>
                </h2>
                <div id="flush-collapse${request._id}"
                     class="accordion-collapse collapse"
                     aria-labelledby="flush-headingOne"
                     data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <a href="/${request._id}/requests" class="mb-2 btn btn-sm btn-outline-dark">Show</a>
                        <p>id: <code>${request._id}</code></p>
                        <p>request_date: <code>${request.request_date}</code></p>
                        <p>remote_ip: <code>${request.remote_ip}</code></p>
                        <p>request_method:  <code>${request.request_method}</code></p>
                        <p>scheme:  <code>${request.scheme}</code></p>
                        <p>query_string: <code>${request.query_string ? request.query_string : null}</code></p>
                        <p>query_params: <code>${request.query_params ? request.query_params : null}</code></p>
                        <p> cookies: <code>${request.cookies ? request.cookies : null}</code></p>
                        <p> headers: <code>${JSON.stringify(request.headers)}</code></p>
                    </div>
                </div>
            </div>`
}
