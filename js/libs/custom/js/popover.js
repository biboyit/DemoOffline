
function PopOver(event) {

    var popover;

    this.findPopovers = function (target) {
        var i, popovers = document.querySelectorAll('a');
        for (; target && target !== document; target = target.parentNode) {
            for (i = popovers.length; i--;) { if (popovers[i] === target) return target; }
        }
    }

    this.onPopoverHidden = function () {        
        popover.style.display = 'none';
        popover.removeEventListener('webkitTransitionEnd', onPopoverHidden);
    }

    this.backdrop = function () {
        var element = document.createElement('div');

        element.classList.add('backdrop');

        element.addEventListener('touchend', function () {
            popover.addEventListener('webkitTransitionEnd', this.onPopoverHidden);
            popover.classList.remove('visible');
        });

        return element;
    }

    this.getPopover = function (e) {
        var anchor = this.findPopovers(e.target);

        if (!anchor || !anchor.hash) return;

        popover = document.querySelector(anchor.hash);

        if (!popover || !popover.classList.contains('popover')) return;

        return popover;
    }


}