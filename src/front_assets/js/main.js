function handleResponse(res, form) {
    (res.error)
        ? Swal.fire('Error!', res.result ?? res.error, 'error')
        : (Swal.fire(res.title, res.result, 'success'), setTimeout(() => {
            res.reload ? window.location.reload() : (form ? form.reset() : null),
                res.redirect ? (window.location.href = res.redirect) : (form ? form.reset() : null)
        }, 2000));

}

jQuery(document).on('click', '.addQty', function (e) {
    let qty = jQuery(e.target).parent().find('input').val();
    jQuery(e.target).parent().find('input').val(++qty);
});

jQuery(document).on('click', '.minusQty', function (e) {
    let qty = jQuery(e.target).parent().find('input').val();
    jQuery(e.target).parent().find('input').val((--qty) ? qty : 1);
});

jQuery(document).on('change', 'input', function (e) {
    setTimeout(() => {
        jQuery(e.target).data('element') ? submitForm(jQuery(e.target).data('form'), jQuery(e.target).data('element'),) : null;
    }, 100);
});

// jQuery(document).on('mouseup', 'input.price', function(e){
//     console.log()
//     setTimeout(() => {
//         jQuery(e.target).data('target-element') ? submitForm(jQuery(e.target).data('form'), jQuery(e.target).data('target-element'), ) : null;
//     }, 100);
// });

jQuery(document).on('submit', '.ajax-form', function (e) {
    e.preventDefault();
    submitForm(e.target.id, e.target.attr);
});

jQuery(document).on('click', '.ajax-link', function (e) {
    e.preventDefault();

    let data = jQuery(this).data('params');
    let path = jQuery(this).attr('href');
    let needConfirm = jQuery(this).data('confirm');
    let confirmText = jQuery(this).data('confirm-text');
    if (needConfirm) {
        Swal.fire({
            title: needConfirm,
            text: confirmText,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then((result) => {
            if (result.isConfirmed) {
                submitLink(path, data);
            }
        });
    } else {
        submitLink(path, data);
    }
});

function submitForm(formId, elementId, append = null) {
    // Get the form and submit button elements
    const form = document.getElementById(formId);
    const element = document.getElementById(elementId);

    if (!form)
        return null;


    // Get the form data as a FormData object
    const formData = new FormData(form);

    // Send the form data via AJAX
    const xhr = new XMLHttpRequest();
    xhr.open('POST', form.action, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            // Handle the successful response 
            try {

                let res = JSON.parse(xhr.responseText);
                handleResponse(res, form)

            } catch (error) {

                element.innerHTML = xhr.responseText;
            }

        } else {
            if (append)
                element.appendChild(xhr.responseText)
            else
                element.innerHTML = xhr.responseText;
        }
    };
    xhr.send(new URLSearchParams(formData).toString());
}


// Submit Ajax request
function submitLink(path, data) {
    $.ajax({
        url: path,
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify({ params: data }), // Your data to send
        processData: false,
        success: function (data) {
            // Update your UI with the new data
            handleResponse(data, null)
        },
        error: function (xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });
}


function pureFadeIn(e, o) {
    var i = document.getElementById(e);
    i.style.opacity = 0, i.style.display = o || "block",
        function e() {
            var o = parseFloat(i.style.opacity);
            (o += .02) > 1 || (i.style.opacity = o, requestAnimationFrame(e))
        }()
}

function getCookie(e) {
    for (var o = e + "=", i = document.cookie.split(";"), t = 0; t < i.length; t++) {
        for (var n = i[t]; " " == n.charAt(0);) {
            n = n.substring(1, n.length);
        }
        if (0 == n.indexOf(o))
            return n.substring(o.length, n.length)
    }
    return null
}

function appendHtml(el, str) {
    var div = document.createElement('div');
    div.innerHTML = str;
    while (div.children.length > 0) {
        el.appendChild(div.children[0]);
    }
}