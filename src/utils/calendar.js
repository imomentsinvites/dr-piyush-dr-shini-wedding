export function openGoogleCalendar() {
  const title = encodeURIComponent("Wedding of Dr. Piyush & Dr. Shini");
  const dates = "20261201T133000Z/20261201T183000Z";
  const details = encodeURIComponent(
    "Wedding celebrations of Dr. Piyush & Dr. Shini at Raj Vilas, Orchha, Madhya Pradesh."
  );
  const location = encodeURIComponent("Raj Vilas, Orchha, Madhya Pradesh");
  window.open(
    `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`,
    "_blank"
  );
}

export function downloadIcsFile() {
  const icsData = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Dr Piyush & Dr Shini Wedding//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    "UID:wedding-piyush-shini-20261201@wedding.com",
    "DTSTAMP:20260926T000000Z",
    "DTSTART:20261201T133000Z",
    "DTEND:20261201T183000Z",
    "SUMMARY:Wedding of Dr. Piyush & Dr. Shini",
    "DESCRIPTION:Wedding celebrations of Dr. Piyush & Dr. Shini at Raj Vilas, Orchha.",
    "LOCATION:Raj Vilas, Orchha, Madhya Pradesh",
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Dr_Piyush_Dr_Shini_Wedding.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
