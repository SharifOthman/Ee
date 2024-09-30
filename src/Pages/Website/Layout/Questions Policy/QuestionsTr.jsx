import React from "react";

export default function QuestionsTr() {
  return (
    <>
      <h1
        className="text-center"
        style={{ color: "white", padding: "30px", backgroundColor: "#ED7200" }}
      >
        SORU VE CEVAP POLİTİKASI
      </h1>
      <div className="container mt-4">
        <div className="mb-4">
          <h4 className="text-orange">Soru Koşulları:</h4>
          <p>
            Soru sadece bilimsel ve mühendislikle ilgili olmalıdır (mühendislik
            dışı sorulara cevap verilmeyecektir).
          </p>
          <p>Soru öz ve metin olmamalıdır.</p>
          <p>Sadece bir soru her seferinde.</p>
          <p>
            Kişisel ayrıntılardan kaçınılmalı ve kişisel terimler
            kullanılmamalıdır.
          </p>
          <p>
            Uygun olmayan kelimeler veya mühendislikle ilgisi olmayan herhangi
            bir içerik kabul edilmez.
          </p>
          <p>
            Tekrarlayan soruları önlemek için, soruyu sormadan önce konuyu web
            sitesinde aramak gereklidir.
          </p>
        </div>
        <div className="mb-4">
          <h4 className="text-orange">
            Cevap Mühendisi Web Sitesinde Cevap Politikası:
          </h4>
          <p>
            Cevaplar, Arap okuyucular için uygun Arapça, anlaşılır ve anlaşılır
            bir şekilde yazılmalıdır; İngilizce cevapta kullanılabilir.
          </p>
          <p>
            Cevap, her bir noktayı soruya dayalı olarak kapsamlı ve açıklayıcı
            olmalıdır.
          </p>
          <p>
            Cevap yalnızca bilimsel mühendislik prensiplerine dayandırılmalıdır
            ve kişisel görüşleri yansıtmamalı veya forumlardan alıntı
            yapılmamalıdır.
          </p>
          <p>
            Belirli bir şirketi tanıtmak veya tanıtmak için herhangi bir reklam
            veya promosyon biçiminden kaçının.
          </p>
          <p>Mühendislik alanıyla ilgisi olmayan metinlerden kaçının.</p>
          <p>
            Cevap sırasında herhangi bir kişisel tanıtım biçiminden kaçının.
            Mühendisin cevabı dolaylı bir tanıtım olarak kabul edilir ve
            iletişim bilgileri profiline yerleştirilebilir, cevapta değil. Bu,
            soruyu soranı iletişim kurmaya veya ziyaret etmeye teşvik
            etmemelidir.
          </p>
          <p>
            Soru soranın adını veya herhangi bir kişisel bilgiyi belirtmekten
            kaçının;<strong> "EyeEngineer"</strong> web sitesi bireylerin
            gizliliğine saygı duyar.
          </p>
        </div>
        <div className="mb-4">
          <h4 className="text-orange">
            Diğer Mühendislerin Görüşlerine Saygı:
          </h4>
          <p>
            Sorulan soruya yanıt verin ve bilimsel mühendislik prensiplerine
            dayalı olarak kendi görüşünüzü ifade etmeye çalışın, kişisel
            önyargılardan veya ilgisiz konulardan kaçının.
          </p>
          <p style={{ color: "#ED7200" }}>
            {" "}
            Not: Bu maddelerin herhangi birinin ihlali, mühendise önceden
            bildirim yapılmaksızın cevabın derhal silinmesine neden olacaktır.
          </p>
        </div>
      </div>
    </>
  );
}
