document.cookie

access = {
    'carrot' : 1,
    'tofu' : 2,
    'guava' : 3
}

$("#passwd").on('keyup', function(event) {
    if(event.which == 13) // enter key
        unlock();
});


document.getElementById('passwd').focus();
unlock(getAccessCookie(), false);

function hidewrongpass() {
  $('#wrongpass').css('opacity', '0%');
}

function unlock(level, wrongpass_message=true) {
    if(!level) {
        level = access[$('#passwd').val()];
    }
    if(level) {
        // $('.block[data-access-level='+level+']').show();
        blocks = $('.block');
        blocks.each(function(idx, elt){
            if( level >= elt.getAttribute('data-access-level') ) 
                $(elt).show();
        });
        if(level > 0)   {
            $('#unlock-controls').hide();
        }
    }
    else { // nothing in access map
        level = -1;
        if(wrongpass_message) {
          $('#wrongpass').css('opacity', '100%');
          setTimeout(hidewrongpass, 2000);
          $('#passwd').val(''); // Clear the password fielddsa
        }
    }

    if(document.getElementById('cookie-permit').checked) {
        setAccessCookie(level);
    }   
}

function setAccessCookie(level) {
    console.log("setting");
    let expires = "expires="+ new Date("19 January 2025").toUTCString();
    document.cookie = "access=" + level + ";" + expires + ";path=/;";
}
function getAccessCookie() {
    // let decodedCookie = document.cookie;
    // decodeURIComponent(document.cookie);
    let parts = `; ${document.cookie}`.split('; access=')
    if(parts.length == 2) 
        return parseInt(parts[1].split(';')[0]);
}

// Code for adding events to calendar

// The date format is YYYYMMDDTHHMMSSZ (UTC time)

// Google Calendar
function addToGoogleCalendar(eventTitle, eventLocation, startDate, endDate, eventDescription="") {
  const googleURL = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(eventDescription)}&location=${encodeURIComponent(eventLocation)}`;
  window.open(googleURL, "_blank");
}

// Apple Calendar (.ics file)
function addToAppleCalendar(eventTitle, eventLocation, startDate, endDate, eventDescription="") {
  const icsData = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${eventTitle}
DTSTART:${startDate}
DTEND:${endDate}
DESCRIPTION:${eventDescription}
LOCATION:${eventLocation}
END:VEVENT
END:VCALENDAR`;
  const blob = new Blob([icsData], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "event.ics";
  link.click();
  URL.revokeObjectURL(url);
}

// Outlook Calendar
function addToOutlookCalendar(eventTitle, eventLocation, startDate, endDate, eventDescription="") {
  const outlookURL = `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${encodeURIComponent(eventTitle)}&body=${encodeURIComponent(eventDescription)}&location=${encodeURIComponent(eventLocation)}&startdt=${startDate}&enddt=${endDate}`;
  window.open(outlookURL, "_blank");
}

function toggleDropdown(i) {
    // const dropdown = $(".dropdown-menu")[parseInt(i)];
    const dropdown = document.getElementById("dropdown-menu-"+i);
    console.log(dropdown);
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  }
  
  // Close dropdown if clicked outside
  window.onclick = function(event) {
    if (!event.target.matches('.main-button')) {
      // document.getElementById("dropdown-menu").style.display = "none";
      $('.dropdown-menu').hide();
    }
  }