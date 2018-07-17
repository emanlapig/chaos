if (!('boxShadow' in document.body.style)) {
    document.body.setAttribute('class', 'noBoxShadow');
}

document.body.addEventListener("click", function(e) {
    var target = e.target;
    if (target.tagName === "INPUT" &&
        target.getAttribute('class').indexOf('liga') === -1) {
        target.select();
    }
});

(function() {
    var fontSize = document.getElementById('fontSize'),
        testDrive = document.getElementById('testDrive'),
        testText = document.getElementById('testText');
    function updateTest() {
        testDrive.innerHTML = testText.value || String.fromCharCode(160);
        if (window.icomoonLiga) {
            window.icomoonLiga(testDrive);
        }
    }
    function updateSize() {
        testDrive.style.fontSize = fontSize.value + 'px';
    }
    fontSize.addEventListener('change', updateSize, false);
    testText.addEventListener('input', updateTest, false);
    testText.addEventListener('change', updateTest, false);
    fontSize.value = 32;
    updateSize();

    testText.value = "adiaj htaoh dam ocon odriz pal egroz aaq elcic odo narmaz do ac eracaz naoav do lomaip paip at iaa apgob do lamaop dmoz pev olohol sd simapi ul mapi abos hot moh sd lipdai onog anda azrnz mzraf halip handaj mre bac gsnernoz sd rip abac aleroho mrasac masrg helobo sbrv sd idla egrp pnong liht abos neiz holbon at hammoc do zmiz aohton aaq qloh sd grplam at aarg daspzan at i ror lo-z arbos ohpnov zlac hsnal tlab dai ohog gsrov fnos lo<br><br>daioi riz pal plerv mzazo do ozlacim narmaz doqon-c ac racaz lehog uzrot nodiaj ninam qo egat sroc fort naon pal nognozo aib sihc placim do irro dsul sihc iuig hotlab egoo sbrut qlsrol atq adelcarap ohlat at gmarba amrasac hpdaip zazazi grplai mabos l viiv dlas piaaf mognoz haapv tgda";
    updateTest();

}());
