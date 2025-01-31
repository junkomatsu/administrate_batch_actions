const init = function() {
  var buttons = document.querySelectorAll("[data-batch-action-option='button']");
  var hybridButtons = document.querySelectorAll("[data-batch-action-option='hybrid-button']");
  var checkboxes = document.querySelectorAll("[data-batch-action-option='checkbox']");
  var selectAllCheckboxes = document.querySelector("[data-batch-action-option='select_all']");

  if (selectAllCheckboxes && checkboxes && buttons) {

    window.onpageshow = function(event) {
      if (selectedItemIds()) {
        checkboxes.forEach(function(checkbox) {
          checkbox.checked = false;
        });

        selectAllCheckboxes.checked = false;
      }
    };

    selectAllCheckboxes.addEventListener('click', function(){
      checkboxes.forEach(function(checkbox) {
        checkbox.checked = selectAllCheckboxes.checked;
      });

      checkAndToggleActionButtons();
    });

    buttons.forEach(function(button){
      button.addEventListener('click', function(event){
        const url = new URL(button.href)
        url.searchParams.delete('batch_action_ids[]')
        checkboxes.forEach((checkbox) => {
          if (checkbox.checked) {
            url.searchParams.append('batch_action_ids[]', checkbox.value)
          }
        })
        button.href = url.toString();
      });
    });

    hybridButtons.forEach(function(button){
      button.addEventListener('click', function(event){
        const url = new URL(button.href)
        url.searchParams.delete('batch_action_ids[]')
        checkboxes.forEach((checkbox) => {
          if (checkbox.checked) {
            url.searchParams.append('batch_action_ids[]', checkbox.value)
          }
        })
        button.href = url.toString();
      });
    });

    checkboxes.forEach(function(checkbox){
      checkbox.closest('td').addEventListener('click', function(event){
        event.stopImmediatePropagation();
      })

      checkbox.addEventListener('click', function(event) {
        event.stopImmediatePropagation();

        checkAndToggleActionButtons();
      })
    })
  }

  function selectedItemIds() {
    var ids = Array.prototype.filter.call(checkboxes, function(checkbox) {
          if (checkbox.checked) { return checkbox }
        }).map(function(checkbox) {
          return 'batch_action_ids[]=' + checkbox.value
        }).join('&');
    return ids;
  }

  function checkAndToggleActionButtons() {
    if (selectedItemIds()) {
      buttons.forEach(function(button){
        button.classList.remove('disabled');
        button.removeAttribute('disabled');
      });
    } else {
      buttons.forEach(function(button){
        button.classList.add('disabled');
        button.setAttribute('disabled', 'disabled');
      });
    }
  }
};

document.addEventListener("DOMContentLoaded", function() { init() });
document.addEventListener("turbolinks:load", function() { init() });
document.addEventListener("turbo:load", function() { init() });
