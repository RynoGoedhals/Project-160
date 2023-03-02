AFRAME.registerComponent("cursor-listener", {
    schema: {
        selectedItemId: {type: "string", default: ""}
    },

    init: function(){
        this.handleClickEvents();
        this.handleMouseEnterEvents();
        this.handleMouseLeaveEvents();
    },

    handleClickEvents: function(){
        this.el.addEventListener("click", evt => {
            const placesContainer = document.querySelector("#places-container");
            const {state} = placesContainer.getAttribute("tour");
        
            if(state === "places-list"){
                const id = this.el.getAttribute("id");
                const placesId = ["place-home", "place-garden", "place-main_gate"];

                if(placesId.includes(id)){
                    placesContainer.setAttribute("tour", {
                        state: "view",
                        selectedPlace: id
                    });
                }
            }
        });
    },

    handlePlacesListState: function(){
        const id = this.el.getAttribute("id");
        const placesId = ["place-home", "place-garden", "place-main_gate"];

        if(placesId.includes(id)){
            const placeContainer = document.querySelector("#places-container");

            placeContainer.setAttribute("cursor-listener", {
                selectedItemId: id
            });

            this.el.setAttribute("material", {
                opacity: 1
            });
        }
    },

    handleMouseEnterEvents: function(){
        this.el.addEventListener("mouseenter", () => {
            const placeContainer = document.querySelector("#places-container");
            const {state} = placeContainer.getAttribute("tour");

            if(state === "places-list"){
                this.handlePlacesListState();
            }
        });
    },

    handleMouseLeaveEvents: function(){
        this.el.addEventListener("mouseleave", () => {
            const placesContainer = document.querySelector("#places-container");
            const {state} = placesContainer.getAttribute("tour");

            if(state === "places-list"){
                const {selectedItemId} = this.data;
                
                if(selectedItemId){
                    const el = document.querySelector(`#${selectedItemId}`);
                    const id = el.getAttribute("id");

                    if(id == selectedItemId){
                        el.setAttribute("material", {
                            opacity: 0.4
                        });
                    }
                }
            }
        });
    }
})