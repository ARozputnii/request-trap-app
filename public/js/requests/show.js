const requestClass = document.getElementsByClassName('request')[0]
const request = JSON.parse(requestClass.innerHTML)

requestClass.innerHTML = buildRequest(request, false)

function buildRequest (request) {
  return `<div class="">
              <a href="/" class="mb-2 btn btn-sm btn-outline-dark">Back</a>
              <p>id: <code>${request._id}</code></p>
              <p>request_date: <code>${request.request_date}</code></p>
              <p>remote_ip: <code>${request.remote_ip}</code></p>
              <p>request_method:  <code>${request.request_method}</code></p>
              <p>scheme:  <code>${request.scheme}</code></p>
              <p>query_string: <code>${request.query_string ? request.query_string : null}</code></p>
              <p>query_params: <code>${request.query_params ? request.query_params : null}</code></p>
              <p> cookies: <code>${request.cookies ? request.cookies : null}</code></p>
              <p> headers: <code>${JSON.stringify(request.headers)}</code></p>
          </div>`
}
