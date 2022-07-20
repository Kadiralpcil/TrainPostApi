module.exports = (req, res) => {
    const tren = req.body.Tren;
    let rezervasyonYapilabilir = false;
    let yerlesimAyrinti = [];
  
    let yolcuSayisi = tren.RezervasyonYapilacakKisiSayisi;
  
    for (const vagon of tren.Vagonlar) {
      const rezervasyonYapilabilecekKoltuklar = Math.floor((vagon.Kapasite *0.7) - vagon.DoluKoltukAdet);
  
      if (rezervasyonYapilabilecekKoltuklar < 1) {
        continue;   
      }
      if (rezervasyonYapilabilecekKoltuklar >= yolcuSayisi) {
        yerlesimAyrinti.push(
          {
            VagonAdi: vagon.Ad,
            KisiSayisi: yolcuSayisi
          }
        );
        rezervasyonYapilabilir = true;
        break;
      }
      if (tren.KisilerFarkliVagonlaraYerlestirilebilir) {
        yerlesimAyrinti.push(
          {
            VagonAdi: vagon.Ad,
            KisiSayisi: rezervasyonYapilabilecekKoltuklar
          }
        );
        yolcuSayisi = yolcuSayisi - rezervasyonYapilabilecekKoltuklar;
      }
    }
  
    if (!rezervasyonYapilabilir) {
      yerlesimAyrinti = [];
    }
    return res.status(200).json(
      {
        "RezervasyonYapilabilir": rezervasyonYapilabilir,
        "YerlesimAyrinti": yerlesimAyrinti
      }
    );
  };
  