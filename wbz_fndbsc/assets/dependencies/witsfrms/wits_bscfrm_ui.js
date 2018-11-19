/**
 * UI Components...
 *
 */
wits_jsfrm.define('wits_bscfrm_ui', [], () => {

  let timeOut;
  class CoolDragItem {
    constructor(icon, bgColor, info) {
      this.$element = $(document.createElement("div"));
      this.icon = icon;
      this.$element.addClass("WITSV_MENU_ITEM");
      this.$element.css("background-color", bgColor);
      const i = document.createElement("i");
      $(i).addClass("fi-" + icon);
      this.$element.append(i);
      this.prev = null;
      this.next = null;
      this.isMoving = false;
      const element = this;
      if(info != null) {
        // this.$element.setAttribute('title', info);
      }
      this.$element.on("mousemove", function() {
        clearTimeout(timeOut);
        timeOut = setTimeout(function() {
          if (element.next && element.isMoving) {
            element.next.moveTo(element);
          }
        }, 10);
      });
      if(this.prev != null) {
        this.$element.on("click", function () {
          alert(info);
        });
      }

    }
    moveTo(item) {
      anime({
        targets: this.$element[0],
        left: item.$element.css("left"),
        top: item.$element.css("top"),
        duration: 700,
        elasticity: 500
      });
      if (this.next) {
        this.next.moveTo(item);
      }
    }
    updatePosition() {
      anime({
        targets: this.$element[0],
        left: this.prev.$element.css("left"),
        top: this.prev.$element.css("top"),
        duration: 200
      });

      if (this.next) {
        this.next.updatePosition();
      }
    }
  }

  class CoolDragMenu {
    constructor(menu) {
      this.$element = $(menu);
      this.size = 0;
      this.first = null;
      this.last = null;
      this.timeOut = null;
      this.hasMoved = false;
      this.status = "closed";
    }

    add(item) {
      const menu = this;
      if (this.first == null) {
        this.first = item;
        this.last = item;
        this.first.$element.on("mouseup", function() {
          if (menu.first.isMoving) {
            menu.first.isMoving = false;
          } else {
            menu.click();
          }
        });
        item.$element.draggable(
          {
            start: function() {
              menu.close();
              item.isMoving = true;
            }
          },
          {
            drag: function() {
              if (item.next) {
                item.next.updatePosition();
              }
            }
          },
          {
            stop: function() {
              item.isMoving = false;
              item.next.moveTo(item);
            }
          }
        );
      } else {
        this.last.next = item;
        item.prev = this.last;
        this.last = item;
      }
      this.$element.after(item.$element);
    }
    open() {
      this.status = "open";
      let current = this.first.next;
      let iterator = 1;
      const head = this.first;
      const sens = head.$element.css("left") < head.$element.css("right") ? 1 : -1;
      while (current != null) {
        anime({
          targets: current.$element[0],
          left: parseInt(head.$element.css("left"), 10) + (sens * (iterator * 50)),
          top: head.$element.css("top"),
          duration: 500
        });
        iterator++;
        current = current.next;
      }
    }
    close() {
      this.status = "closed";
      let current = this.first.next;
      const head = this.first;
      let iterator = 1;
      while (current != null) {
        anime({
          targets: current.$element[0],
          left: head.$element.css("left"),
          top: head.$element.css("top"),
          duration: 500
        });
        iterator++;
        current = current.next;
      }
    }
    click() {
      if (this.status === "closed") {
        this.open();
      } else {
        this.close();
      }
    }
  }

  return {
    CoolDragItem: CoolDragItem,
    CoolDragMenu: CoolDragMenu,
  };
});
