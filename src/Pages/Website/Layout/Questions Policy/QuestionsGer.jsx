import React from "react";

export default function QuestionsGer() {
  return (
    <>
      <h1
        className="text-center"
        style={{ color: "white", padding: "30px", backgroundColor: "#ED7200" }}
      >
        FRAGE- UND ANTWORTENRICHTLINIE
      </h1>
      <div className="container mt-4">
        <div className="mb-4">
          <h4 className="text-orange">Fragebedingungen:</h4>
          <p>
            Die Frage muss ausschließlich wissenschaftlich und technisch sein
            (keine Antwort wird bereitgestellt, wenn die Frage außerhalb des
            Bereichs der Ingenieurwissenschaften liegt).
          </p>
          <p>Die Frage sollte prägnant sein und kein Text.</p>
          <p>Nur eine Frage auf einmal.</p>
          <p>
            Vermeiden Sie persönliche Details und verzichten Sie auf die
            Verwendung persönlicher Begriffe.
          </p>
          <p>
            Unangemessene Wörter oder jeglicher Inhalt, der nicht mit dem
            Ingenieurwesen zusammenhängt, sind nicht erlaubt.
          </p>
          <p>
            Um redundante Fragen zu vermeiden, ist es erforderlich, das Thema
            auf der Website zu suchen, bevor die Frage gestellt wird.
          </p>
        </div>
        <div className="mb-4">
          <h4 className="text-orange">
            Antwortrichtlinie auf der Website "EyeEngineer":
          </h4>
          <p>
            Antworten sollten in korrektem Arabisch verfasst sein, klar und
            verständlich für arabische Leser; Englisch kann in der Antwort
            verwendet warden.
          </p>
          <p>
            Die Antwort sollte umfassend und erläuternd für jeden Punkt in der
            Frage sein.
          </p>
          <p>
            Die Antwort muss ausschließlich auf wissenschaftlichen
            Ingenieurprinzipien basieren und darf keine persönlichen Meinungen
            widerspiegeln oder aus Foren zitiert warden.
          </p>
          <p>
            Vermeiden Sie jede Form von Werbung oder Promotion für ein
            bestimmtes Unternehmen.
          </p>
          <p>
            Halten Sie sich von Texten fern, die nicht mit dem Ingenieurwesen zu
            tun haben.
          </p>
          <p>
            Vermeiden Sie während der Antwort jede Form von persönlicher
            Werbung. Die Antwort des Ingenieurs gilt als indirekte Werbung, und
            die Kontaktdaten können in ihrem Profil, nicht in der Antwort,
            platziert werden. Dies sollte den Fragesteller nicht dazu ermutigen,
            Kontakt aufzunehmen oder zu besuchen.
          </p>
          <p>
            Vermeiden Sie die Nennung des Namens des Fragestellers oder
            jeglicher persönlicher Informationen; die Website{" "}
            <strong>"EyeEngineer"</strong> respektiert die Privatsphäre der
            Personen.
          </p>
        </div>
        <div className="mb-4">
          <h4 className="text-orange">
            Respektieren Sie die Meinungen anderer Ingenieure:
          </h4>
          <p>
            Reagieren Sie auf die gestellte Frage und versuchen Sie, Ihre
            Meinung basierend auf wissenschaftlichen Ingenieurprinzipien
            auszudrücken, wobei persönliche Vorurteile oder irrelevante Themen
            vermieden warden.
          </p>
          <p style={{ color: "#ED7200" }}>
            {" "}
            Hinweis: Jede Verletzung dieser Punkte führt zur sofortigen Löschung
            der Antwort ohne vorherige Benachrichtigung des Ingenieurs.
          </p>
        </div>
      </div>
    </>
  );
}
