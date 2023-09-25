({
    doInit : function(component, event, helper) {
        console.log('#AuraContainer doInit()');
        //let currentTime = component.find('child').getCurrentTime();
        //console.log(currentTime);
    },
    handleOnblur: function(component, event, helper){
        let attributeName = event.getSource().get('v.name');
        let value = event.getSource().get('v.value');
        if(attributeName === 'firstName'){
            component.set('v.firstName', value);
        } else{
            component.set('v.lastName', value);
        }
    },

    getCurrentTime : function(component, event){
        let currentTime = component.find('child').getCurrentTime();
        component.set('v.currentTime', currentTime);
        //console.log(currentTime);
    }
})
