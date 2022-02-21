(async () => {
    var Tanks = window.Tanks;
    
    Tanks.options = {
        fancy_turning: 0,
        turn_with_turret: 0,
        no_opposite_turret: 0,
        show_buttons: 1
    };
    
    Tanks.push_options = () => {
        try {
            window.localStorage.setItem("options", JSON.stringify(Tanks.options));
            
            return 1;
        } catch (info) {
            return 0;
        }
    };
    
    try {
        var options = JSON.parse(window.localStorage.getItem("options"));

        if (!options)
            throw [];

        for (var x in options)
            Tanks.options[x] = options[x];
    } catch (info) {
        info;
    }
    
    var id = [...Array(8)].map(_ => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"[Math.random() * 64 | 0]).join("");
    
    Tanks.id = () => id;

    Tanks.is_mobile = () => /Mobi/.test(navigator.userAgent);
    
    var start_data = await Tanks.start();
    
    Tanks.watching = () => start_data.watching;
    Tanks.name = () => start_data.name;
    Tanks.colorblind = () => start_data.colorblind;
    Tanks.autoshoot = () => start_data.autoshoot;
    Tanks.autoaim = () => start_data.autoaim;
    Tanks.stat = () => JSON.parse(JSON.stringify(start_data.stats));
    
    await Tanks.start_ws(start_data.watching);
    
    Tanks.start_inputs();
    
    setInterval(() => {
        Tanks.tick();
        
        Tanks.draw();
    }, 25);
})();
