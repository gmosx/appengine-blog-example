exports = window;

exports.showErrors = function (form, errors) {
    form.find("div.error").remove();
    form.find(".error").removeClass("error");
    for (var i in errors) {
        var field = form.find('[name=' + i + ']');
        if (field.length > 0) {
            field.addClass("error").after('<div class="error">' + errors[i] + '</div>');
        } else {
            form.prepend('<div class="error">' + errors[i] + '</div>');
        }
    }
}

